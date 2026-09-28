import { expect, test } from "bun:test"
import { asPage } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { COVER_WIDTH_ASKED } from "akasha/story/ui/modules/character-cover-panel/character-cover-panel.module.code.tsx"
import {
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
})

test("a panel not asking for the cover draws none, though the character has one", () => {
  expect(playerDrawnOf(NALA, "nala", false, null).cover).toBeNull()
})

test("with no row yet, the caption falls to the sheet's name, then the slug", () => {
  expect(playerDrawnOf(undefined, "nala", true, { sheet: { name: "Alan" } }).name).toBe("Alan")
  expect(playerDrawnOf(undefined, "nala", true, { sheet: null }).name).toBe("Nala")
  expect(playerDrawnOf(undefined, "", true, null).name).toBeNull()
})
