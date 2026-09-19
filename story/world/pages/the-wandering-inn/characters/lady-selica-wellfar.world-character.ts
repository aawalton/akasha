import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ladySelicaWellfar = {
  id: "01a0b70b-7592-7127-a23c-1f283347c8cd",
  type: "page-type/world-character",
  slug: "lady-selica-wellfar",
  title: "Selica",
  world: "world/the-wandering-inn",
  firstChapter: 646,
  lastChapter: 646,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
