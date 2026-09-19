import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const elena = {
  id: "01a0b70a-2721-744c-a73a-6f6160d23a6a",
  type: "page-type/world-character",
  slug: "elena",
  title: "Elena",
  world: "world/the-wandering-inn",
  firstChapter: 431,
  lastChapter: 797,
  characterClaims: "jsonl",
  aliasOf: "world-character/elena-othonos",
} as const satisfies WorldCharacter
