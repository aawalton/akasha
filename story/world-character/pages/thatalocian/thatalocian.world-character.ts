import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const thatalocian = {
  id: "01a0b70d-1b42-7843-838e-7b5d0093b356",
  type: "page-type/world-character",
  slug: "thatalocian",
  title: "Thatalocian",
  world: "world/the-wandering-inn",
  firstChapter: 676,
  lastChapter: 799,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
