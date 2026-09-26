import { expect, test } from "bun:test"
import { asPage } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { persona } from "akasha/persona/persona.page-type.ts"
import { characterOther } from "akasha/story/character/other/character-other.page-type.ts"
import { characterPlayer } from "akasha/story/character/player/character-player.page-type.ts"
import {
  characterSlugsIn,
  latestTurnId,
  personaCoversOf,
  personaSlugsOf,
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

function other(slug: string): string {
  return namedAs(characterOther.slug, slug, null)
}

test("a turn's other characters are read as slugs, once each", () => {
  expect(characterSlugsIn([other("a"), other("b"), other("a")])).toEqual(["a", "b"])
})

test("the character the player plays is passed over", () => {
  expect(characterSlugsIn([namedAs(characterPlayer.slug, "p", null), other("a")])).toEqual(["a"])
})

test("a turn naming no characters names none", () => {
  expect(characterSlugsIn(undefined)).toEqual([])
  expect(characterSlugsIn(other("a"))).toEqual([])
})

test("each character who is a persona gives her, in the order the turn names them", () => {
  const rows = [
    row({ slug: "b", persona: her("two") }),
    row({ slug: "a", persona: her("one") }),
    row({ slug: "c" }),
  ]
  expect(personaSlugsOf(["a", "b", "c"], rows)).toEqual(["one", "two"])
})

test("each persona named is drawn by her cover, in the order the turn names her", () => {
  const rows = [
    row({ slug: "two", cover: "image/image-b" }),
    row({ slug: "one", cover: "image/image-a" }),
  ]
  expect(personaCoversOf(["one", "two"], rows)).toEqual([
    { slug: "one", name: "One", source: "/api/page-file/image/image-a/bytes" },
    { slug: "two", name: "Two", source: "/api/page-file/image/image-b/bytes" },
  ])
})

test("a persona is named in title case from her slug", () => {
  const rows = [row({ slug: "sophia", cover: "image/image-a" })]
  expect(personaCoversOf(["sophia"], rows)[0]?.name).toBe("Sophia")
})

test("a persona with no cover is left out", () => {
  expect(personaCoversOf(["one"], [row({ slug: "one" })])).toEqual([])
})
