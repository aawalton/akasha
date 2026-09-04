import { expect, test } from "bun:test"
import {
  checkReaches,
  draftSaid,
  judgedBy,
  judgedOver,
  passedOver,
  reachedIn,
} from "./judged-saying.module.code.ts"

const count = (many: number, one: string): string => `${many} ${one}${many === 1 ? "" : "s"}`

const INSIDE = "akasha/one.ts"

const OUTSIDE = "../one.ts"

test("a check reaches a path inside this checkout and no other", () => {
  expect(checkReaches(INSIDE)).toBe(true)
  expect(checkReaches(OUTSIDE)).toBe(false)
  expect(checkReaches("/etc/one.ts")).toBe(false)
})

test("the paths a check reached are read from one rule", () => {
  expect(reachedIn([INSIDE, OUTSIDE, "akasha/two.ts"])).toBe(2)
})

test("a dry run names how many checks ran and how many paths they were handed", () => {
  expect(passedOver(count, 1, 1, 1)).toBe("1 check passed over the 1 path asked for")
  expect(passedOver(count, 12, 6, 6)).toBe("12 checks passed over the 6 paths asked for")
  expect(passedOver(count, 0, 2, 2)).toBe(
    "no check runs at this phase, so the 2 paths asked for would go unjudged"
  )
})

test("a landing names what judged it, and says so when nothing did", () => {
  expect(judgedBy(count, 1, 1, 1)).toBe("1 check judged the 1 path asked for, and none refused")
  expect(judgedBy(count, 0, 1, 1)).toBe(
    "no check runs at this phase, so the 1 path asked for landed unjudged"
  )
})

test("a draft names how many paths the patch would leave were judged", () => {
  expect(judgedOver(count, 1, 1, 1)).toBe(
    "1 check judged the 1 path the patch would leave, and none refused"
  )
  expect(judgedOver(count, 0, 2, 2)).toBe(
    "no check runs at this phase, so the 2 paths the patch would leave went unjudged"
  )
})

test("a count over paths no check reached says nothing was judged rather than counting them", () => {
  expect(judgedBy(count, 40, 0, 1)).toBe(
    "no check judges a path outside this checkout, so the 1 path asked for landed unjudged"
  )
  expect(passedOver(count, 0, 0, 1)).toBe(
    "no check judges a path outside this checkout, so the 1 path asked for would go unjudged"
  )
  expect(judgedOver(count, 40, 0, 2)).toBe(
    "no check judges a path outside this checkout, so the 2 paths the patch would leave went unjudged"
  )
})

test("a count over a mix says how many of what was asked for was judged", () => {
  expect(judgedBy(count, 40, 3, 5)).toBe(
    "40 checks judged 3 of the 5 paths asked for, and none refused"
  )
  expect(passedOver(count, 12, 3, 5)).toBe("12 checks passed over 3 of the 5 paths asked for")
  expect(judgedOver(count, 40, 1, 3)).toBe(
    "40 checks judged 1 of the 3 paths the patch would leave, and none refused"
  )
})

test("a draft nothing refused is counted and says nothing more", () => {
  expect(draftSaid(count, 2, [INSIDE], [], [])).toEqual([
    "2 checks judged the 1 path the patch would leave, and none refused",
  ])
})

test("a draft a check refused names what refused and says the patch waits on it", () => {
  const refused = [{ path: INSIDE, reason: "refused for the test" }]
  expect(draftSaid(count, 2, [INSIDE], refused, ["akasha/two.ts"])).toEqual([
    "2 checks judged the 1 path the patch would leave, and these refused",
    "akasha/one.ts — refused for the test",
    "the patch is judged whole, so it applies once every path it holds passes",
    "akasha/two.ts carries a conflict — resolve it in the patch before the patch applies",
  ])
})

test("the line naming what no check reached agrees with the count beside it", () => {
  expect(judgedBy(count, 40, 0, 1).startsWith("no check judges a path outside this checkout")).toBe(
    true
  )
})
