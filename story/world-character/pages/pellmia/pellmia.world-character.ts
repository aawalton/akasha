import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const pellmia = {
  id: "01a0b70c-27dd-7610-8858-b4bc0ce6c958",
  type: "page-type/world-character",
  slug: "pellmia",
  title: "Lord Pellmia",
  world: "world/the-wandering-inn",
  firstChapter: 290,
  lastChapter: 290,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
