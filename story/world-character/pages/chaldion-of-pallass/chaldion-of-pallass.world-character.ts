import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const chaldionOfPallass = {
  id: "01a0b709-fcec-7ca0-82d7-c86881f4783d",
  type: "page-type/world-character",
  slug: "chaldion-of-pallass",
  title: "Chaldion of Pallass",
  world: "world/the-wandering-inn",
  firstChapter: 468,
  lastChapter: 468,
  characterClaims: "jsonl",
  aliasOf: "world-character/chaldion",
} as const satisfies WorldCharacter
