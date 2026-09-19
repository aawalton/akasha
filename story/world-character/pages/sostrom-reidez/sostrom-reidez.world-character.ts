import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const sostromReidez = {
  id: "01a0b70d-0b4f-7f83-a76a-eaf7d370fcba",
  type: "page-type/world-character",
  slug: "sostrom-reidez",
  title: "Sostrom Reidez",
  world: "world/the-wandering-inn",
  firstChapter: 42,
  lastChapter: 42,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
