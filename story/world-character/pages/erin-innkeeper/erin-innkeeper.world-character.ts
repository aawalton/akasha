import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const erinInnkeeper = {
  id: "01a0b70a-7111-77e4-8001-187c5e303f93",
  type: "page-type/world-character",
  slug: "erin-innkeeper",
  title: "Erin (innkeeper)",
  world: "world/the-wandering-inn",
  firstChapter: 480,
  lastChapter: 480,
  characterClaims: "jsonl",
  aliasOf: "world-character/erin-solstice",
} as const satisfies WorldCharacter
