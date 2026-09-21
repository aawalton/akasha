import { expect, test } from "bun:test"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  reachedIn,
  STANDING,
  wrongIn,
} from "akasha/command/pages/request/modules/reaching/request-reaching.module.code.ts"

const REPO = rootOf(import.meta.dir)

test("a request of no text is refused", () => {
  expect(wrongIn({ slug: "   " })).toEqual([
    "the request said is empty, and a feature request is named by the slug that request declares",
  ])
})

test("a request of no word at all is refused as one of spaces is", () => {
  expect(wrongIn({ slug: "" })).toEqual(wrongIn({ slug: "   " }))
})

test("a request naming a slug is left to the lookup", () => {
  expect(wrongIn({ slug: "dark-mode" })).toEqual([])
})

test("a slug no feature request declares is reached nowhere", () => {
  expect(reachedIn(REPO, "no-request-declares-this")).toBe(null)
})

test("the key the standing is written under is the property slug", () => {
  expect(STANDING).toBe("standing")
})
