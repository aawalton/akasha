import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const princessIsodore = {
  id: "01a0b70c-7500-7e1c-8bc0-233233f19f64",
  type: "page-type/world-character",
  slug: "princess-isodore",
  title: "Isodore",
  world: "world/the-wandering-inn",
  firstChapter: 216,
  lastChapter: 216,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
