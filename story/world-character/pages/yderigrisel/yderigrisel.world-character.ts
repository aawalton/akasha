import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const yderigrisel = {
  id: "01a0b70d-d982-7f02-bcc8-fe5db0c7a117",
  type: "page-type/world-character",
  slug: "yderigrisel",
  title: "Yderigrisel",
  world: "world/the-wandering-inn",
  firstChapter: 495,
  lastChapter: 495,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
