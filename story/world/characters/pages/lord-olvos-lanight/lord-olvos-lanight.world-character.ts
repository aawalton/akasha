import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lordOlvosLanight = {
  id: "01a0b70b-8a7a-7567-9e39-ac09b682426b",
  type: "page-type/world-character",
  slug: "lord-olvos-lanight",
  title: "Olvos",
  world: "world/the-wandering-inn",
  firstChapter: 717,
  lastChapter: 818,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
