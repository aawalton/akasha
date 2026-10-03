import { expect, test } from "bun:test"
import { asPage } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  COVER_WIDTH_ASKED,
  characterShownAt,
} from "akasha/story/ui/modules/character-cover-panel/character-cover-panel.module.code.tsx"
import {
  charactersShownOf,
  playerDrawnOf,
  playerSlugOf,
} from "akasha/story/ui/modules/player-character-panel/player-character-panel.module.code.tsx"
import { characterOther } from "akasha/story/world/characters/character-other/character-other.page-type.ts"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"

const NALA = asPage({ id: "n", icon: null, slug: "nala", title: "Nala", cover: "image/image-n" })

test("the player's slug is read off the story's character player", () => {
  expect(playerSlugOf(namedAs(characterPlayer.slug, "nala", null))).toBe("nala")
  expect(playerSlugOf(namedAs(characterOther.slug, "links", null))).toBe("")
  expect(playerSlugOf("")).toBe("")
})

test("the caption is the character's title, with the sheet's level", () => {
  const drawn = playerDrawnOf(NALA, "nala", true, { sheet: { name: "Other", level: 3 } })
  expect(drawn.name).toBe("Nala")
  expect(drawn.level).toBe(3)
  expect(drawn.cover).toBe(`/api/page-file/image/image-n/bytes?w=${COVER_WIDTH_ASKED}`)
  expect(drawn.whole).toBe("/api/page-file/image/image-n/bytes")
})

test("a panel not asking for the cover draws none, though the character has one", () => {
  expect(playerDrawnOf(NALA, "nala", false, null).cover).toBeNull()
  expect(playerDrawnOf(NALA, "nala", false, null).whole).toBeNull()
})

test("with no row yet, the caption falls to the sheet's name, then the slug", () => {
  expect(playerDrawnOf(undefined, "nala", true, { sheet: { name: "Alan" } }).name).toBe("Alan")
  expect(playerDrawnOf(undefined, "nala", true, { sheet: null }).name).toBe("Nala")
  expect(playerDrawnOf(undefined, "", true, null).name).toBeNull()
})

function other(slug: string) {
  return { slug, name: slug, source: `${slug}-small`, whole: slug }
}

test("the player's character comes first and is shown first, the others after in the turn's order", () => {
  const shown = charactersShownOf(playerDrawnOf(NALA, "nala", true, null), "nala", false, [
    other("b"),
    other("a"),
  ])
  expect(shown.map((one) => one.slug)).toEqual(["nala", "b", "a"])
  expect(shown.map((one) => one.isPlayer)).toEqual([true, false, false])
  expect(characterShownAt(shown, null)).toBe(0)
})

test("another character is drawn by its cover, named by its title, with no level", () => {
  const [shown] = charactersShownOf(playerDrawnOf(undefined, "", true, null), "", false, [
    other("a"),
  ])
  expect(shown).toEqual({
    slug: "a",
    name: "a",
    level: null,
    cover: "a-small",
    whole: "a",
    isPlayer: false,
  })
})

test("the player is left out where neither a cover nor a revealed sheet draws them", () => {
  const drawn = playerDrawnOf(NALA, "nala", false, null)
  expect(charactersShownOf(drawn, "nala", false, [other("a")]).map((one) => one.slug)).toEqual([
    "a",
  ])
  expect(charactersShownOf(drawn, "nala", true, []).map((one) => one.slug)).toEqual(["nala"])
})
