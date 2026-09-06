import { expect, test } from "bun:test"
import { saidUnder } from "./page-renaming.module.code.ts"

const AT = "akasha/one/held.thing.ts"

const THERE = "akasha/one/renamed.thing.ts"

const BESIDE = "akasha/one/held.thing.code.ts"

const BESIDE_THERE = "akasha/one/renamed.thing.code.ts"

const NAMER = "akasha/two/namer.thing.ts"

test("a body under the path a file moved to is said under the path that file moved from", () => {
  const said = saidUnder(
    new Map([[AT, THERE]]),
    new Map([
      [THERE, "the page that moved"],
      [NAMER, "the page naming it"],
    ])
  )
  expect([...said.keys()].sort()).toEqual([AT, NAMER])
  expect(said.get(AT)).toBe("the page that moved")
  expect(said.get(THERE)).toBeUndefined()
  expect(said.get(NAMER)).toBe("the page naming it")
})

test("every moved file is said under its own path", () => {
  const said = saidUnder(
    new Map([
      [AT, THERE],
      [BESIDE, BESIDE_THERE],
    ]),
    new Map([
      [THERE, "the page"],
      [BESIDE_THERE, "the code"],
    ])
  )
  expect([...said.keys()].sort()).toEqual([BESIDE, AT].sort())
  expect(said.get(AT)).toBe("the page")
  expect(said.get(BESIDE)).toBe("the code")
})

test("a file that moved and left no body is left out", () => {
  const said = saidUnder(new Map([[AT, THERE]]), new Map([[NAMER, "the page naming it"]]))
  expect([...said.keys()]).toEqual([NAMER])
})
