import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const hedagWitch = {
  id: "01a0b70a-f6ed-7565-874d-12d289da77a3",
  type: "page-type/world-character",
  slug: "hedag-witch",
  title: "Hedag",
  world: "world/the-wandering-inn",
  firstChapter: 519,
  lastChapter: 519,
  characterClaims: "jsonl",
  aliasOf: "world-character/hedag",
} as const satisfies WorldCharacter
