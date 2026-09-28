import { expect, test } from "bun:test"
import { asPage } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { persona } from "akasha/persona/persona.page-type.ts"
import {
  COVER_WIDTH_ASKED,
  characterCoversOf,
  charactersIn,
  latestTurnId,
  othersOf,
  slugsOf,
} from "akasha/story/ui/modules/character-cover-panel/character-cover-panel.module.code.tsx"
import { characterOther } from "akasha/story/world/characters/character-other/character-other.page-type.ts"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"

function turn(id: string) {
  return { id, title: id, text: "" }
}

function row(values: Record<string, unknown>) {
  return asPage({ id: "x", title: null, icon: null, slug: null, ...values })
}

function other(slug: string): string {
  return namedAs(characterOther.slug, slug, null)
}

function player(slug: string): string {
  return namedAs(characterPlayer.slug, slug, null)
}

function source(image: string): string {
  return `/api/page-file/image/${image}/bytes?w=${COVER_WIDTH_ASKED}`
}

test("the latest turn is the last one drawn", () => {
  expect(latestTurnId([turn("a"), turn("b")])).toBe("b")
})

test("no turn drawn has no latest turn", () => {
  expect(latestTurnId([])).toBeNull()
})

test("a turn's characters are read with their page types, once each, in the turn's order", () => {
  expect(charactersIn([player("p"), other("a"), other("a")])).toEqual([
    { pageTypeSlug: characterPlayer.slug, slug: "p" },
    { pageTypeSlug: characterOther.slug, slug: "a" },
  ])
})

test("a name that is no character is passed over", () => {
  expect(charactersIn([namedAs(persona.slug, "echo", null), other("a")])).toEqual([
    { pageTypeSlug: characterOther.slug, slug: "a" },
  ])
})

test("a turn naming no characters names none", () => {
  expect(charactersIn(undefined)).toEqual([])
  expect(charactersIn(other("a"))).toEqual([])
})

test("the slugs of one page type are taken in the turn's order", () => {
  const named = charactersIn([other("b"), player("p"), other("a")])
  expect(slugsOf(named, characterOther.slug)).toEqual(["b", "a"])
  expect(slugsOf(named, characterPlayer.slug)).toEqual(["p"])
})

test("each character is drawn by its own cover at twice the panel's width, named by its title", () => {
  const named = charactersIn([player("p"), other("a")])
  const rows = new Map([
    [characterOther.slug, [row({ slug: "a", title: "The Woman", cover: "image/image-a" })]],
    [characterPlayer.slug, [row({ slug: "p", title: "Alan", cover: "image/image-p" })]],
  ])
  expect(characterCoversOf(named, rows)).toEqual([
    { slug: "p", name: "Alan", source: source("image-p") },
    { slug: "a", name: "The Woman", source: source("image-a") },
  ])
  expect(COVER_WIDTH_ASKED).toBe(536)
})

test("a character with no title is named in title case from its slug", () => {
  const rows = new Map([[characterOther.slug, [row({ slug: "sophia", cover: "image/image-a" })]]])
  expect(characterCoversOf(charactersIn([other("sophia")]), rows)[0]?.name).toBe("Sophia")
})

test("a character's persona is not followed for a cover", () => {
  const echo = namedAs(persona.slug, "echo", null)
  const rows = new Map([[characterOther.slug, [row({ slug: "a", persona: echo })]]])
  expect(characterCoversOf(charactersIn([other("a")]), rows)).toEqual([])
})

test("the other characters are the turn's characters that are not the player's", () => {
  expect(othersOf(charactersIn([player("p"), other("a"), other("b")]))).toEqual([
    { pageTypeSlug: characterOther.slug, slug: "a" },
    { pageTypeSlug: characterOther.slug, slug: "b" },
  ])
  expect(othersOf(charactersIn([player("p")]))).toEqual([])
})

test("a character with no cover, or no row, is left out", () => {
  const named = charactersIn([other("a"), other("b")])
  const rows = new Map([[characterOther.slug, [row({ slug: "a" })]]])
  expect(characterCoversOf(named, rows)).toEqual([])
})
