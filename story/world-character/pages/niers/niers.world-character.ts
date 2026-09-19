import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const niers = {
  id: "01a0b70c-08f1-7a16-a42e-fd931895f2e1",
  type: "page-type/world-character",
  slug: "niers",
  title: "Niers",
  world: "world/the-wandering-inn",
  firstChapter: 123,
  lastChapter: 802,
  characterClaims: "jsonl",
  aliasOf: "world-character/niers-astoragon",
} as const satisfies WorldCharacter
