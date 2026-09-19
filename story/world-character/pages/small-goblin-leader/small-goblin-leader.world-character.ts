import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const smallGoblinLeader = {
  id: "01a0b70d-05ff-7511-8b79-37b9a01956ea",
  type: "page-type/world-character",
  slug: "small-goblin-leader",
  title: "the small Goblin",
  world: "world/the-wandering-inn",
  firstChapter: 55,
  lastChapter: 55,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
