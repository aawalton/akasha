import { expect, test } from "bun:test"
import { iconByDescent } from "akasha/alan/web/.server/page-icon/page-icon.module.code.ts"

function type(slug: string, icon: string | null, ...parents: string[]) {
  return {
    _id: `id-${slug}`,
    properties: { slug, icon, extends: parents.map((one) => `page-type/${one}`) },
  }
}

const TYPES = [
  type("page", null),
  type("collection", null, "page"),
  type("collection-external", "globe", "collection"),
  type("story", "library", "collection"),
  type("story-played", "gamepad-2", "story"),
  type("story-written", null, "story"),
  type("story-read", null, "story", "collection-external"),
  type("chapter", "scroll-text", "collection"),
  type("story-chapter-played", null, "chapter"),
]

test("a page naming an icon is drawn with that icon", () => {
  expect(iconByDescent("swords", TYPES, "story-played")).toBe("swords")
})

test("a page naming none takes its page type's icon", () => {
  expect(iconByDescent(undefined, TYPES, "story-played")).toBe("gamepad-2")
  expect(iconByDescent("", TYPES, "story-played")).toBe("gamepad-2")
})

test("a page type naming none takes the icon of the type it extends", () => {
  expect(iconByDescent(null, TYPES, "story-written")).toBe("library")
  expect(iconByDescent(null, TYPES, "story-chapter-played")).toBe("scroll-text")
})

test("of two page types equally near, the one named last decides", () => {
  expect(iconByDescent(null, TYPES, "story-read")).toBe("globe")
})

test("a page with no icon anywhere above it names none", () => {
  expect(iconByDescent(null, TYPES, "collection")).toBeNull()
  expect(iconByDescent(null, TYPES, "no-such-type")).toBeNull()
})
