import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const admiralRosech = {
  id: "01a0b707-6469-7e40-9086-a3dacb2e6d27",
  type: "page-type/world-character",
  slug: "admiral-rosech",
  title: "Admiral Rosech",
  world: "world/the-wandering-inn",
  firstChapter: 687,
  lastChapter: 687,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
