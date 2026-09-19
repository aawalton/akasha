import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const vaulontTheAsh = {
  id: "01a0b70d-89b7-7635-a80b-fb3fa7bc26b7",
  type: "page-type/world-character",
  slug: "vaulont-the-ash",
  title: "Vaulont the Ash",
  world: "world/the-wandering-inn",
  firstChapter: 708,
  lastChapter: 708,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
