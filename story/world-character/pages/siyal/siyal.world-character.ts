import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const siyal = {
  id: "01a0b70d-043b-7130-938d-37e94d5aee41",
  type: "page-type/world-character",
  slug: "siyal",
  title: "Siyal",
  world: "world/the-wandering-inn",
  firstChapter: 323,
  lastChapter: 323,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
