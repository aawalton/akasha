import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const slashface = {
  id: "01a0b70d-051c-7470-94ce-e094507915af",
  type: "page-type/world-character",
  slug: "slashface",
  title: "Slashface",
  world: "world/the-wandering-inn",
  firstChapter: 823,
  lastChapter: 823,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
