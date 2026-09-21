import { expect, test } from "bun:test"
import {
  fieldsOf,
  saidAs,
} from "akasha/product/wandering-inn-wiki/web/modules/innworld-reading/innworld-reading.module.code.ts"

test("a value a browser is shown reads as one line, and a list reads as its parts", () => {
  expect(saidAs("held")).toBe("held")
  expect(saidAs(3)).toBe("3")
  expect(saidAs(false)).toBe("false")
  expect(saidAs(["one", "two"])).toBe("one, two")
  expect(saidAs([])).toBeNull()
})

test("no value a page holds in a file beside it is shown", () => {
  expect(saidAs({ held: 1 })).toBeNull()
  expect(saidAs(null)).toBeNull()
})

test("what names a page rather than saying something of it is left out of its fields", () => {
  const held = "a-world-nobody-wrote"
  const fields = fieldsOf({
    id: "01a0",
    pageTypeId: "01a1",
    pageTypeSlug: "a-type-nobody-wrote",
    slug: "a-thing-nobody-wrote",
    type: "a-type-nobody-wrote",
    title: "A Thing Nobody Wrote",
    world: held,
    grade: 2,
  })
  expect(fields).toEqual([
    ["grade", "2"],
    ["world", held],
  ])
})
