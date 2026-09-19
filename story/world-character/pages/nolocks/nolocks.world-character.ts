import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const nolocks = {
  id: "01a0b70c-0ccb-7885-8beb-7f9240f86edb",
  type: "page-type/world-character",
  slug: "nolocks",
  title: "Nolocks",
  world: "world/the-wandering-inn",
  firstChapter: 450,
  lastChapter: 450,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
