import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { startedAt } from "akasha/file/modules/lock-holder/lock-holder.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { LOCK_AT } from "akasha/git/modules/holding/holding.module.code.ts"
import {
  apartFor,
  landedApart,
  left,
  settledApart,
  unheldSaid,
} from "akasha/page/service/modules/read-settling/read-settling.module.code.ts"

const scratch = scratchWorld()

afterAll(() => scratch.sweep())

function checkout(): string {
  const root = scratch.rootFor("akasha-read-settling-")
  mkdirSync(join(root, ".git"), { recursive: true })
  return root
}

function held(root: string): string {
  const at = join(root, LOCK_AT)
  writeFileSync(at, `${process.pid} ${startedAt(process.pid)}`)
  return at
}

test("a read no landing holds is answered at once, and leaves no mark of reading", async () => {
  const apart = apartFor(2)
  const said = await settledApart(checkout(), apart, 1, () => {
    expect(Atomics.load(apart, 2)).toBe(1)
    return "read"
  })
  expect(said).toEqual({ settled: "read" })
  expect([...apart]).toEqual([0, 0, 0])
})

test("a read waits for a landing's hold on the checkout to go before it starts", async () => {
  const root = checkout()
  const at = held(root)
  setTimeout(() => rmSync(at, { force: true }), 100)
  let heldAtStart = true
  const said = await settledApart(root, apartFor(1), 0, () => {
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
    apartFor(1),
    0,
    () => {
      ran = true
      return "read"
    },
    50
  )
  rmSync(at, { force: true })
  expect(said).toEqual({ refused: unheldSaid(50) })
  expect(ran).toBe(false)
})

test("a landing the service makes waits for the read a thread is answering", async () => {
  const apart = apartFor(2)
  Atomics.store(apart, 2, 1)
  let landed = false
  const landing = landedApart(apart, async () => {
    expect(Atomics.load(apart, 0)).toBe(1)
    landed = true
    return "landed"
  })
  await Bun.sleep(30)
  expect(landed).toBe(false)
  left(apart, 1)
  expect(await landing).toBe("landed")
  expect(Atomics.load(apart, 0)).toBe(0)
})

test("a landing waits for reads no longer than its wait, then goes ahead", async () => {
  const apart = apartFor(1)
  Atomics.store(apart, 1, 1)
  expect(await landedApart(apart, async () => "landed", 20)).toBe("landed")
  expect(Atomics.load(apart, 0)).toBe(0)
})
