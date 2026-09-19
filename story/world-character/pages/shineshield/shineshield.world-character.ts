import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const shineshield = {
  id: "01a0b70c-fcd4-70cb-9d9a-a1219e73ed2c",
  type: "page-type/world-character",
  slug: "shineshield",
  title: "Shineshield",
  world: "world/the-wandering-inn",
  firstChapter: 409,
  lastChapter: 729,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
