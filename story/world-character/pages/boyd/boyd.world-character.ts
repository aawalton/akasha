import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const boyd = {
  id: "01a0b707-88f1-7279-b562-fba6d42592f0",
  type: "page-type/world-character",
  slug: "boyd",
  title: "Boyd Sunver",
  world: "world/the-wandering-inn",
  firstChapter: 822,
  lastChapter: 822,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
