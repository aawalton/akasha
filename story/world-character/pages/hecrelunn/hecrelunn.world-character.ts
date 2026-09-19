import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const hecrelunn = {
  id: "01a0b70a-f67e-722e-b7d3-d48acf4ec375",
  type: "page-type/world-character",
  slug: "hecrelunn",
  title: "Hecrelunn",
  world: "world/the-wandering-inn",
  firstChapter: 577,
  lastChapter: 600,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
