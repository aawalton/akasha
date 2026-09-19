import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const jericha = {
  id: "01a0b70b-1efb-7537-ac73-ee885c975244",
  type: "page-type/world-character",
  slug: "jericha",
  title: "Jericha",
  world: "world/the-wandering-inn",
  firstChapter: 478,
  lastChapter: 478,
  characterClaims: "jsonl",
  aliasOf: "world-character/jericha-synthel",
} as const satisfies WorldCharacter
