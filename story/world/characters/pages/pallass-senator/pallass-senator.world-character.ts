import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const pallassSenator = {
  id: "01a0b70c-204c-7310-95ea-444c70963582",
  type: "page-type/world-character",
  slug: "pallass-senator",
  title: "Pallass Senator",
  world: "world/the-wandering-inn",
  firstChapter: 298,
  lastChapter: 298,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
