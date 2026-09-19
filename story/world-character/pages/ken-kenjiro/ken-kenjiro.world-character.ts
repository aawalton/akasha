import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const kenKenjiro = {
  id: "01a0b70b-623b-724c-a0c6-ec531e25506a",
  type: "page-type/world-character",
  slug: "ken-kenjiro",
  title: "Kenjiro",
  world: "world/the-wandering-inn",
  firstChapter: 197,
  lastChapter: 197,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
