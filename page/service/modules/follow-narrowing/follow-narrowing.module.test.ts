import { expect, test } from "bun:test"
import {
  whereIn,
  within,
} from "akasha/page/service/modules/follow-narrowing/follow-narrowing.module.code.ts"

test("a where is taken only where a question could ask it", () => {
  expect(whereIn(undefined)).toBeUndefined()
  expect(whereIn({ app: { is: "web-app/requests" } })).toEqual({ app: { is: "web-app/requests" } })
  expect(whereIn("app")).toBeNull()
  expect(whereIn([])).toBeNull()
})

test("a page is within a narrow where it is inside it now or was before", () => {
  const narrowed = { where: { app: { is: "web-app/requests" } }, met: new Set(["home"]) }
  const outside = () => ({ app: "web-app/other" })
  expect(within(narrowed, "home", outside)).toBe(true)
  expect(narrowed.met.has("home")).toBe(false)
  expect(within(narrowed, "home", outside)).toBe(false)
  expect(within(narrowed, "home", () => ({ app: "web-app/requests" }))).toBe(true)
  expect(narrowed.met.has("home")).toBe(true)
})
