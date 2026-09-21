import { expect, test } from "bun:test"
import { headOf, listedBy } from "akasha/page/view/modules/key-naming/key-naming.module.code.ts"

test("a key parted by dots names the property its first segment names", () => {
  expect(headOf("wold.held")).toBe("wold")
})

test("a key parted by no dot names itself", () => {
  expect(headOf("wold")).toBe("wold")
})

test("a key opening with a dot names nothing before that dot", () => {
  expect(headOf(".held")).toBe("")
})

test("the page type a view lists is read off the view", () => {
  expect(listedBy({ pageType: "page-type/quoin" })).toBe("quoin")
})

test("a page type named by slug alone is read as that slug", () => {
  expect(listedBy({ pageType: "quoin" })).toBe("quoin")
})

test("a view listing no page type lists none", () => {
  expect(listedBy({})).toBe(null)
})
