import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const princessAielef = {
  id: "01a0b70c-748e-7e82-a0ae-d961f3b724a4",
  type: "page-type/world-character",
  slug: "princess-aielef",
  title: "Princess Aielef",
  world: "world/the-wandering-inn",
  firstChapter: 572,
  lastChapter: 572,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
