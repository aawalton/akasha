import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const garusaWeatherfur = {
  id: "01a0b70a-9399-7d8c-b900-0c28bb602fed",
  type: "page-type/world-character",
  slug: "garusa-weatherfur",
  title: "Garusa Weatherfur",
  world: "world/the-wandering-inn",
  firstChapter: 193,
  lastChapter: 232,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
