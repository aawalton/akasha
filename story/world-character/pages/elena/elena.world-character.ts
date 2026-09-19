import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const elena = {
  id: "01a0b70a-2721-744c-a73a-6f6160d23a6a",
  type: "page-type/world-character",
  slug: "elena",
  title: "Elena",
  world: "world/the-wandering-inn",
  firstChapter: 431,
  lastChapter: 797,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
