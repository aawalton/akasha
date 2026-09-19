import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const yrimenGolemhand = {
  id: "01a0b70d-e237-779c-ae3e-93c8b3e0512b",
  type: "page-type/world-character",
  slug: "yrimen-golemhand",
  title: "Yrimen",
  world: "world/the-wandering-inn",
  firstChapter: 715,
  lastChapter: 715,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
