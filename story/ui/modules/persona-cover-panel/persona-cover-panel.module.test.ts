import { expect, test } from "bun:test"
import { asPage } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { persona } from "akasha/persona/persona.page-type.ts"
import {
  latestTurnId,
  personaCoversOf,
  personaSlugsIn,
} from "akasha/story/ui/modules/persona-cover-panel/persona-cover-panel.module.code.tsx"

function turn(id: string) {
  return { id, title: id, text: "" }
}

function row(values: Record<string, unknown>) {
  return asPage({ id: "x", title: null, icon: null, slug: null, ...values })
}

test("the latest turn is the last one drawn", () => {
  expect(latestTurnId([turn("a"), turn("b")])).toBe("b")
})

test("no turn drawn has no latest turn", () => {
  expect(latestTurnId([])).toBeNull()
})

function her(slug: string): string {
  return namedAs(persona.slug, slug, null)
}

test("a turn's personas are read as slugs, once each", () => {
  expect(personaSlugsIn([her("one"), her("two"), her("one")])).toEqual(["one", "two"])
})

test("a turn naming no personas names none", () => {
  expect(personaSlugsIn(undefined)).toEqual([])
  expect(personaSlugsIn(her("one"))).toEqual([])
})

test("each persona named is drawn by her cover, in the order the turn names her", () => {
  const rows = [
    row({ slug: "two", cover: "image/image-b" }),
    row({ slug: "one", cover: "image/image-a", title: "One" }),
  ]
  expect(personaCoversOf(["one", "two"], rows)).toEqual([
    { slug: "one", name: "One", source: "/api/page-file/image/image-a/bytes" },
    { slug: "two", name: "two", source: "/api/page-file/image/image-b/bytes" },
  ])
})

test("a persona with no cover is left out", () => {
  expect(personaCoversOf(["one"], [row({ slug: "one" })])).toEqual([])
})
