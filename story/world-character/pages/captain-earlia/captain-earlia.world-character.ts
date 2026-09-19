import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const captainEarlia = {
  id: "01a0b707-925d-7c99-ae79-ee0a84548706",
  type: "page-type/world-character",
  slug: "captain-earlia",
  title: "Captain Earlia of Gemhammer",
  world: "world/the-wandering-inn",
  firstChapter: 763,
  lastChapter: 763,
} as const satisfies WorldCharacter
