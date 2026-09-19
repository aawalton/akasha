import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const arthurPendragonYoung = {
  id: "01a0b707-72d9-723f-831a-1167151d51c5",
  type: "page-type/world-character",
  slug: "arthur-pendragon-young",
  title: "Arthur Pendragon",
  world: "world/the-wandering-inn",
  firstChapter: 724,
  lastChapter: 724,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
