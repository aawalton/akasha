import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const gireulashia = {
  id: "01a0b70a-9ea2-7e96-9ad5-17cbba2b13e4",
  type: "page-type/world-character",
  slug: "gireulashia",
  title: "Gireulashia",
  world: "world/the-wandering-inn",
  firstChapter: 543,
  lastChapter: 637,
  characterClaims: "jsonl",
  aliasOf: "world-character/gireulashia-ekhtouch",
} as const satisfies WorldCharacter
