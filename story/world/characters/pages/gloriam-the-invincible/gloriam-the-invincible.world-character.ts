import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const gloriamTheInvincible = {
  id: "01a0b70a-9fc2-7d8e-8f8e-b57246bf9a02",
  type: "page-type/world-character",
  slug: "gloriam-the-invincible",
  title: "Gloriam the Invincible",
  world: "world/the-wandering-inn",
  firstChapter: 576,
  lastChapter: 576,
  characterClaims: "jsonl",
  aliasOf: "world-character/gloriam",
} as const satisfies WorldCharacter
