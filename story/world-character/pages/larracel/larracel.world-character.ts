import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const larracel = {
  id: "01a0b70b-7d56-7faa-8fc9-68d8db8e4a59",
  type: "page-type/world-character",
  slug: "larracel",
  title: "Larracel Delais",
  world: "world/the-wandering-inn",
  firstChapter: 770,
  lastChapter: 772,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
