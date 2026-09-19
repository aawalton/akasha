import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const rosencrantz = {
  id: "01a0b70c-9f83-751c-a75a-0898727f9bd7",
  type: "page-type/world-character",
  slug: "rosencrantz",
  title: "Rosencrantz",
  world: "world/the-wandering-inn",
  firstChapter: 707,
  lastChapter: 751,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
