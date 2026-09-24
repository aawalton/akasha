import { expect, test } from "bun:test"
import { pageName } from "akasha/page/core/modules/page-name/page-name.module.code.ts"

test("a page with a title is named by its title", () => {
  expect(pageName({ title: "Morning Pages", slug: "morning-pages" })).toBe("Morning Pages")
})

test("a page with no title is named by its slug, titled", () => {
  expect(pageName({ slug: "athena" })).toBe("Athena")
  expect(pageName({ title: null, slug: "seat-fleet" })).toBe("Seat Fleet")
  expect(pageName({ title: "", slug: "athena" })).toBe("Athena")
})

test("a page with neither a title nor a slug is named Untitled", () => {
  expect(pageName({})).toBe("Untitled")
  expect(pageName({ title: "", slug: "" })).toBe("Untitled")
  expect(pageName(null)).toBe("Untitled")
  expect(pageName(undefined)).toBe("Untitled")
})
