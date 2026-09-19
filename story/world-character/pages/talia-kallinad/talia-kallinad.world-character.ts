import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const taliaKallinad = {
  id: "01a0b70d-125a-7257-a179-776b27299656",
  type: "page-type/world-character",
  slug: "talia-kallinad",
  title: "Talia",
  world: "world/the-wandering-inn",
  firstChapter: 333,
  lastChapter: 572,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
