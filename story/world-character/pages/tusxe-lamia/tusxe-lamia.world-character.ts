import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const tusxeLamia = {
  id: "01a0b70d-74af-7bc7-9eaa-51a9fe6eec63",
  type: "page-type/world-character",
  slug: "tusxe-lamia",
  title: "Tusxe",
  world: "world/the-wandering-inn",
  firstChapter: 519,
  lastChapter: 519,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
