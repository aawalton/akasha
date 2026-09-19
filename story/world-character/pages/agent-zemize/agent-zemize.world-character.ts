import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const agentZemize = {
  id: "01a0b707-650e-76bc-bafa-44c541ea7479",
  type: "page-type/world-character",
  slug: "agent-zemize",
  title: "Zemize",
  world: "world/the-wandering-inn",
  firstChapter: 779,
  lastChapter: 779,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
