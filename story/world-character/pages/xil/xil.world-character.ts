import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const xil = {
  id: "01a0b70d-a43b-7d4c-9f3a-c61ec2e0923c",
  type: "page-type/world-character",
  slug: "xil",
  title: "Xil",
  world: "world/the-wandering-inn",
  firstChapter: 445,
  lastChapter: 671,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
