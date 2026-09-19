import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const jourtebenRabeis = {
  id: "01a0b70b-22e5-7a70-a88b-d47fca241e08",
  type: "page-type/world-character",
  slug: "jourteben-rabeis",
  title: "Jourteben Rabeis",
  world: "world/the-wandering-inn",
  firstChapter: 823,
  lastChapter: 823,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
