import { expect, test } from "bun:test"
import { titledAs } from "akasha/product/wandering-inn-wiki/web/modules/innworld-reading/innworld-reading.module.code.ts"

test("a collection is named by its words, each starting in a capital", () => {
  expect(titledAs("characters")).toBe("Characters")
  expect(titledAs("named-events")).toBe("Named Events")
  expect(titledAs("world")).toBe("World")
})

test("a name of no words is left as it is", () => {
  expect(titledAs("")).toBe("")
})
