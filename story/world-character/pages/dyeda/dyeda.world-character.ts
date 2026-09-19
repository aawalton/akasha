import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const dyeda = {
  id: "01a0b70a-2204-70e5-ac24-9dfaa91e3621",
  type: "page-type/world-character",
  slug: "dyeda",
  title: "Dyeda",
  world: "world/the-wandering-inn",
  firstChapter: 716,
  lastChapter: 747,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
