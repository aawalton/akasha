import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { startedAt } from "akasha/file/modules/lock-holder/lock-holder.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { LOCK_AT } from "akasha/git/modules/holding/holding.module.code.ts"
import {
  landedMark,
  settledApart,
  unheldSaid,
  unsettledSaid,
} from "akasha/page/service/modules/read-settling/read-settling.module.code.ts"

const scratch = scratchWorld()

afterAll(() => scratch.sweep())

function checkout(): string {
  const root = scratch.rootFor("akasha-read-settling-")
  mkdirSync(join(root, ".git", "refs", "heads"), { recursive: true })
  writeFileSync(join(root, ".git", "HEAD"), "ref: refs/heads/main\n")
  writeFileSync(join(root, ".git", "refs", "heads", "main"), "a\n")
  writeFileSync(join(root, ".git", "index"), "staged")
  return root
}

let committed = 0

function landedOn(root: string): undefined {
  committed += 1
  const at = join(root, ".git", "refs", "heads", "main")
  writeFileSync(`${at}.part`, `${committed}${"b".repeat(committed)}\n`)
  rmSync(at)
  writeFileSync(at, `${committed}${"b".repeat(committed)}\n`)
  rmSync(`${at}.part`)
}

function held(root: string): string {
  const at = join(root, LOCK_AT)
  writeFileSync(at, `${process.pid} ${startedAt(process.pid)}`)
  return at
}

test("a read no landing reaches is answered at its first try", async () => {
  const root = checkout()
  let ran = 0
  const said = await settledApart(root, async () => {
    ran += 1
    return "read"
  })
  expect(said).toEqual({ settled: "read" })
  expect(ran).toBe(1)
})

test("a read a landing committed under is answered again", async () => {
  const root = checkout()
  let ran = 0
  const said = await settledApart(root, async () => {
    ran += 1
    if (ran === 1) landedOn(root)
    return ran
  })
  expect(said).toEqual({ settled: 2 })
})

test("a read that ends while the hold is held is answered again", async () => {
  const root = checkout()
  let ran = 0
  const said = await settledApart(root, async () => {
    ran += 1
    if (ran === 1) {
      const at = held(root)
      setTimeout(() => rmSync(at, { force: true }), 50)
    }
    return ran
  })
  expect(said).toEqual({ settled: 2 })
})

test("a read waits for the hold to go before it starts", async () => {
  const root = checkout()
  const at = held(root)
  setTimeout(() => rmSync(at, { force: true }), 100)
  let heldAtStart = true
  const said = await settledApart(root, async () => {
    heldAtStart = existsSync(at)
    return "read"
  })
  expect(said).toEqual({ settled: "read" })
  expect(heldAtStart).toBe(false)
})

test("a hold kept past the wait is refused rather than read through", async () => {
  const root = checkout()
  const at = held(root)
  let ran = false
  const said = await settledApart(
    root,
    async () => {
      ran = true
      return "read"
    },
    5,
    50
  )
  rmSync(at, { force: true })
  expect(said).toEqual({ refused: unheldSaid(50) })
  expect(ran).toBe(false)
})

test("a read every try of which a landing reaches is refused rather than answered torn", async () => {
  const root = checkout()
  const said = await settledApart(
    root,
    async () => {
      landedOn(root)
      return "torn"
    },
    3
  )
  expect(said).toEqual({ refused: unsettledSaid(3) })
})

test("a commit moves the mark, and a staging or a page written does not", () => {
  const root = checkout()
  const was = landedMark(root)
  expect(landedMark(root)).toBe(was)
  writeFileSync(join(root, "page.ts"), "written")
  writeFileSync(join(root, ".git", "index"), "staged again")
  expect(landedMark(root)).toBe(was)
  landedOn(root)
  expect(landedMark(root)).not.toBe(was)
})
