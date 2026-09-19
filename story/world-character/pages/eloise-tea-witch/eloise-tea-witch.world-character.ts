import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const eloiseTeaWitch = {
  id: "01a0b70a-6686-7d11-bb85-86cdd99ddb57",
  type: "page-type/world-character",
  slug: "eloise-tea-witch",
  title: "Eloise",
  world: "world/the-wandering-inn",
  firstChapter: 519,
  lastChapter: 715,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
