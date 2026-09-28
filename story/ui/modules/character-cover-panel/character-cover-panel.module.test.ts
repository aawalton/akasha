import { expect, test } from "bun:test"
import { asPage } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { persona } from "akasha/persona/persona.page-type.ts"
import {
  COVER_WIDTH_ASKED,
  characterCoversOf,
  charactersDrawn,
  charactersIn,
  latestTurnId,
  pagedAt,
  pickedFor,
  slugsOf,
  turnCoverAt,
  turnCoversOf,
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

test("the turn's picture sits under the player's cover", () => {
  const drawn = (slug: string) => ({ slug, name: slug, source: source(slug) })
  expect(turnCoverAt([drawn("a"), drawn("p"), drawn("b")], ["p"])).toBe(2)
  expect(turnCoverAt([drawn("a")], ["p"])).toBe(0)
  expect(turnCoverAt([], [])).toBe(0)
})

test("the turns paged through are every turn handed with a cover, drawn at twice the panel's width", () => {
  const handed = [
    { id: "a", number: 1, cover: "image/image-a" },
    { id: "c", number: 3, cover: "image/image-c" },
  ]
  expect(turnCoversOf(handed)).toEqual([
    { id: "a", number: 1, source: source("image-a") },
    { id: "c", number: 3, source: source("image-c") },
  ])
})

test("no turn handed draws no picture", () => {
  expect(turnCoversOf([])).toEqual([])
})

test("the paging opens on the latest turn with a cover", () => {
  const covers = [
    { id: "a", number: 1, source: "" },
    { id: "b", number: 2, source: "" },
  ]
  expect(pagedAt(covers, null)).toBe(1)
  expect(pagedAt(covers, "a")).toBe(0)
  expect(pagedAt(covers, "gone")).toBe(1)
})

test("a turn paged to holds only until a later turn is drawn", () => {
  expect(pickedFor({ from: "b", to: "a" }, "b")).toBe("a")
  expect(pickedFor({ from: "b", to: "a" }, "c")).toBeNull()
  expect(pickedFor(null, "b")).toBeNull()
})

test("a character with no cover, or no row, is left out", () => {
  const named = charactersIn([other("a"), other("b")])
  const rows = new Map([[characterOther.slug, [row({ slug: "a" })]]])
  expect(characterCoversOf(named, rows)).toEqual([])
})

test("the story's player is drawn where no open turn names a character", () => {
  expect(charactersDrawn(undefined, player("p"))).toEqual([
    { pageTypeSlug: characterPlayer.slug, slug: "p" },
  ])
  expect(charactersDrawn([other("a")], player("p"))).toEqual([
    { pageTypeSlug: characterOther.slug, slug: "a" },
  ])
  expect(charactersDrawn(undefined, "")).toEqual([])
})
