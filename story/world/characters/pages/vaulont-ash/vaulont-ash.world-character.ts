import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const vaulontAsh = {
  id: "01a0b70d-897d-7517-b911-9b1a7a4c0fd5",
  type: "page-type/world-character",
  slug: "vaulont-ash",
  title: "Vaulont the Ash",
  world: "world/the-wandering-inn",
  firstChapter: 763,
  lastChapter: 763,
  characterClaims: "jsonl",
  aliasOf: "world-character/vaulont",
} as const satisfies WorldCharacter
