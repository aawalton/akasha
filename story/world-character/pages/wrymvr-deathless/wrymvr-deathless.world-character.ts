import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const wrymvrDeathless = {
  id: "01a0b70d-a14c-7a25-baa8-f743aade1512",
  type: "page-type/world-character",
  slug: "wrymvr-deathless",
  title: "Wrymvr the Deathless",
  world: "world/the-wandering-inn",
  firstChapter: 464,
  lastChapter: 464,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
