import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const beilmark = {
  id: "01a0b707-7ecc-73e7-8132-350d53140db3",
  type: "page-type/world-character",
  slug: "beilmark",
  title: "Beilmark",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  firstChapter: 6,
  lastChapter: 785,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:18:36.876Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
