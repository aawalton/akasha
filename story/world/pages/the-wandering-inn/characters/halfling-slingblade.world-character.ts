import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const halflingSlingblade = {
  id: "01a0b70a-ee86-7faa-9aba-af389defe97d",
  type: "page-type/world-character",
  slug: "halfling-slingblade",
  title: "the Halfling",
  world: "world/the-wandering-inn",
  firstChapter: 759,
  lastChapter: 759,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
