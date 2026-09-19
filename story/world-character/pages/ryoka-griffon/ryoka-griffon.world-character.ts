import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ryokaGriffon = {
  id: "01a0b70c-a5b9-75fc-b714-98106813c55c",
  type: "page-type/world-character",
  slug: "ryoka-griffon",
  title: "Ryoka Griffon",
  world: "world/the-wandering-inn",
  firstChapter: 112,
  lastChapter: 112,
  characterClaims: "jsonl",
  aliasOf: "world-character/ryoka-griffin",
} as const satisfies WorldCharacter
