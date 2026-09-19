import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const thunderfur = {
  id: "01a0b70d-643f-7b0c-ba53-6d1e76fc40ce",
  type: "page-type/world-character",
  slug: "thunderfur",
  title: "Thunderfur",
  world: "world/the-wandering-inn",
  firstChapter: 409,
  lastChapter: 752,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
