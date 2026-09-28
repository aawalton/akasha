import { afterAll, expect, test } from "bun:test"
import { existsSync } from "node:fs"
import { join } from "node:path"
import { exclusively } from "akasha/file/modules/exclusive/exclusive.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"

const PAGE = "turn.story-turn-played.ts"

const WAITED_MS = 5_000

const QUICK_MS = 1_000

const SHORT_MS = 50

const NOWHERE = "no-such-folder"

const scratch = scratchWorld()

afterAll(scratch.sweep)

test("an act runs inside the turn, and no turn is left after it", () => {
  const root = scratch.rootFor("akasha-exclusive-")
  const at = join(root, PAGE)
  expect(exclusively(at, () => existsSync(`${at}.lock`))).toBe(true)
  expect(existsSync(`${at}.lock`)).toBe(false)
})

test("a turn that cannot be made is refused at once rather than waited on", () => {
  const root = scratch.rootFor("akasha-exclusive-")
  const at = join(root, NOWHERE, PAGE)
  let acted = false
  const from = Date.now()
  expect(() =>
    exclusively(
      at,
      () => {
        acted = true
      },
      WAITED_MS
    )
  ).toThrow(/could not be made/)
  expect(Date.now() - from).toBeLessThan(QUICK_MS)
  expect(acted).toBe(false)
})

test("a turn a live holder has is waited on and refused once the wait ends", () => {
  const root = scratch.rootFor("akasha-exclusive-")
  const at = join(root, PAGE)
  expect(() => exclusively(at, () => exclusively(at, () => true, SHORT_MS))).toThrow(
    /did not come free/
  )
  expect(existsSync(`${at}.lock`)).toBe(false)
})

test("an act that settles later keeps the turn until it settles, then gives it up", async () => {
  const root = scratch.rootFor("akasha-exclusive-")
  const at = join(root, PAGE)
  const held = exclusively(at, async () => {
    await Bun.sleep(SHORT_MS)
    return existsSync(`${at}.lock`)
  })
  expect(existsSync(`${at}.lock`)).toBe(true)
  expect(await held).toBe(true)
  expect(existsSync(`${at}.lock`)).toBe(false)
})
