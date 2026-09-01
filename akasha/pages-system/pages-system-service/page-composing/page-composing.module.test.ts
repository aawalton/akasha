import { expect, test } from "bun:test"
import type { Carried } from "@akasha/pages-system/page-type-properties"
import { orderedIn, pathFor } from "./page-composing.module.code.ts"

function carrying(key: string, declaredBy: string): Carried {
  return {
    pagePropertySlug: key,
    pageTypeSlug: "text-property",
    propertySlug: key,
    key,
    unique: null,
    declaredBy,
    required: false,
    many: false,
    max: null,
    total: null,
    uncommitted: false,
    secret: false,
  }
}

test("the keys are written in the order they are declared, the deepest type first", () => {
  const said = orderedIn([
    carrying("token", "device-token"),
    carrying("id", "page"),
    carrying("slug", "page"),
  ])
  expect(said.map((one) => one.key)).toEqual(["id", "slug", "token"])
})

test("one type's keys keep the order that type declares them in", () => {
  const said = orderedIn([carrying("b", "thing"), carrying("a", "thing")])
  expect(said.map((one) => one.key)).toEqual(["b", "a"])
})

test("a page the index does not hold is placed under its type's folder by the plural", () => {
  const said = pathFor(
    "akasha/person-system/device-token/device-token.page-type.ts",
    "device-tokens",
    "device-token",
    "one"
  )
  expect(said).toBe("akasha/person-system/device-token/device-tokens/one.device-token.ts")
})
