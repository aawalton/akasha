import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const beth = {
  id: "01a0b707-817a-7724-8350-69ba8a66023d",
  type: "page-type/world-character",
  slug: "beth",
  title: "Beth",
  world: "world/the-wandering-inn",
  firstChapter: 699,
  lastChapter: 699,
  characterClaims: "jsonl",
  aliasOf: "world-character/beth-scastein",
} as const satisfies WorldCharacter
