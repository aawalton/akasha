import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const spitty = {
  id: "01a0b70d-0bbf-7d74-9b64-2b773fe40b5a",
  type: "page-type/world-character",
  slug: "spitty",
  title: "Spitty",
  world: "world/the-wandering-inn",
  firstChapter: 637,
  lastChapter: 671,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
