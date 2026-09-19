import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const whiteRabbit = {
  id: "01a0b70d-9d77-74a4-93a2-b943c1edd8fa",
  type: "page-type/world-character",
  slug: "white-rabbit",
  title: "the White Rabbit",
  world: "world/the-wandering-inn",
  firstChapter: 477,
  lastChapter: 477,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
