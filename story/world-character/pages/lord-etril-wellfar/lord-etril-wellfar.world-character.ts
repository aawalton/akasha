import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lordEtrilWellfar = {
  id: "01a0b70b-895e-738c-88ac-67df688ad7ff",
  type: "page-type/world-character",
  slug: "lord-etril-wellfar",
  title: "Lord Etril Wellfar",
  world: "world/the-wandering-inn",
  firstChapter: 599,
  lastChapter: 787,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
