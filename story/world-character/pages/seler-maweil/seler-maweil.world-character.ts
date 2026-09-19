import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const selerMaweil = {
  id: "01a0b70c-f069-7797-94d9-2d174ad5234c",
  type: "page-type/world-character",
  slug: "seler-maweil",
  title: "Seler",
  world: "world/the-wandering-inn",
  firstChapter: 454,
  lastChapter: 454,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
