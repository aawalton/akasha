import { expect, test } from "bun:test"
import { inNameOrder } from "./name-ordering.module.code.ts"

test("names are answered in the order the locale sorts them by", () => {
  expect(inNameOrder(["B", "a", "c"])).toEqual(["a", "B", "c"])
})

test("the names handed in are left in the order handed in", () => {
  const said = ["b", "a"]
  inNameOrder(said)
  expect(said).toEqual(["b", "a"])
})

test("a name said twice is answered twice", () => {
  expect(inNameOrder(["a", "a"])).toEqual(["a", "a"])
})
