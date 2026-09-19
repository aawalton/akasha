import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const fetohepKhelt = {
  id: "01a0b70a-8363-7a46-bcc1-47c7aa01ad56",
  type: "page-type/world-character",
  slug: "fetohep-khelt",
  title: "Fetohep of Khelt",
  world: "world/the-wandering-inn",
  firstChapter: 418,
  lastChapter: 422,
  characterClaims: "jsonl",
  aliasOf: "world-character/fetohep",
} as const satisfies WorldCharacter
