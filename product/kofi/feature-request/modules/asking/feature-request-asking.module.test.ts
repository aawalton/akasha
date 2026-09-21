import { expect, test } from "bun:test"
import {
  landedFor,
  NO_POINTS,
  NOTHING_TO_DO,
  pointsIn,
  SIGNED_OUT,
  saidIn,
} from "akasha/product/kofi/feature-request/modules/asking/feature-request-asking.module.code.ts"

const PRODUCT = "the product a site says its posts are for"

const SOMEBODY = { product: PRODUCT, contributor: "contributor-abc" } as const

const NOBODY = { product: PRODUCT, contributor: null } as const

test("a body that is no object says nothing at any key", () => {
  expect(saidIn(null, "act")).toBe("")
  expect(saidIn("propose", "act")).toBe("")
  expect(saidIn([1, 2], "act")).toBe("")
})

test("a key holding anything but text says nothing", () => {
  expect(saidIn({ act: 7 }, "act")).toBe("")
  expect(saidIn({ act: "boost" }, "act")).toBe("boost")
})

test("points said as a number come back as that number", () => {
  expect(pointsIn({ points: 25 })).toBe(25)
})

test("points said as text are read as a number", () => {
  expect(pointsIn({ points: "25" })).toBe(25)
})

test("points that are no number at all come back as nothing", () => {
  expect(pointsIn({ points: "lots" })).toBe(null)
  expect(pointsIn({ points: "" })).toBe(null)
  expect(pointsIn({ points: Number.NaN })).toBe(null)
  expect(pointsIn({})).toBe(null)
  expect(pointsIn(null)).toBe(null)
})

test("a post by nobody signed in is refused before the act is read", async () => {
  expect(await landedFor({ act: "propose", ask: "Dark mode" }, NOBODY)).toEqual({
    refused: SIGNED_OUT,
  })
})

test("an act this names none of is refused", async () => {
  expect(await landedFor({ act: "delete" }, SOMEBODY)).toEqual({ refused: NOTHING_TO_DO })
})

test("a body saying no act at all is refused the same way", async () => {
  expect(await landedFor({}, SOMEBODY)).toEqual({ refused: NOTHING_TO_DO })
})

test("boosting with no number of points is refused before anything is read", async () => {
  expect(await landedFor({ act: "boost", request: "dark-mode" }, SOMEBODY)).toEqual({
    refused: NO_POINTS,
  })
})
