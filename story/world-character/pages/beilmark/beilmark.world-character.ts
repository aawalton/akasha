import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const beilmark = {
  id: "01a0b707-7ecc-73e7-8132-350d53140db3",
  type: "page-type/world-character",
  slug: "beilmark",
  title: "Beilmark",
  world: "world/the-wandering-inn",
  firstChapter: 6,
  lastChapter: 785,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
