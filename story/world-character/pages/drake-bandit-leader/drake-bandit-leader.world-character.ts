import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const drakeBanditLeader = {
  id: "01a0b70a-1c75-724d-86f3-afb9cda6a43d",
  type: "page-type/world-character",
  slug: "drake-bandit-leader",
  title: "Drake",
  world: "world/the-wandering-inn",
  firstChapter: 330,
  lastChapter: 330,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
