import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ladyRieValerund = {
  id: "01a0b70b-7523-7ccd-a0fc-2f50b66ccb46",
  type: "page-type/world-character",
  slug: "lady-rie-valerund",
  title: "Rie",
  world: "world/the-wandering-inn",
  firstChapter: 224,
  lastChapter: 501,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
