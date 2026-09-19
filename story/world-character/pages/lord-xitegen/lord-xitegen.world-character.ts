import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lordXitegen = {
  id: "01a0b70b-8c12-7d79-8a72-7ae54e324504",
  type: "page-type/world-character",
  slug: "lord-xitegen",
  title: "Lord Xitegen",
  world: "world/the-wandering-inn",
  firstChapter: 756,
  lastChapter: 778,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
