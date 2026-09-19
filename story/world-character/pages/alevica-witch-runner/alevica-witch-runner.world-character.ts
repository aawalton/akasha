import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const alevicaWitchRunner = {
  id: "01a0b707-698a-752a-b5bf-868462c29907",
  type: "page-type/world-character",
  slug: "alevica-witch-runner",
  title: "Alevica",
  world: "world/the-wandering-inn",
  firstChapter: 715,
  lastChapter: 715,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
