import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const guardsmanDrake = {
  id: "01a0b70a-ecca-7f26-9faa-9e9af3500702",
  type: "page-type/world-character",
  slug: "guardsman-drake",
  title: "Drake Guardsman",
  world: "world/the-wandering-inn",
  firstChapter: 41,
  lastChapter: 41,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
