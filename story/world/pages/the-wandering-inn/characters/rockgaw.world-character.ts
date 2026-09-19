import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const rockgaw = {
  id: "01a0b70c-9bd2-7975-852a-367d0d4992d5",
  type: "page-type/world-character",
  slug: "rockgaw",
  title: "Rockgaw",
  world: "world/the-wandering-inn",
  firstChapter: 89,
  lastChapter: 89,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
