import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const relcGrasstongue = {
  id: "01a0b70c-8fa0-73a1-a693-57e0af845202",
  type: "page-type/world-character",
  slug: "relc-grasstongue",
  title: "Relc Grasstongue",
  world: "world/the-wandering-inn",
  firstChapter: 241,
  lastChapter: 752,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
