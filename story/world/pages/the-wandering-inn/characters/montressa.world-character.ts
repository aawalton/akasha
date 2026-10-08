import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const montressa = {
  id: "01a06580-2495-75bc-ac0c-db554ccb1a62",
  type: "page-type/world-character",
  slug: "montressa",
  title: "Montressa du Valeross",
  world: "world/the-wandering-inn",
  appearanceCount: 15,
  eventCount: 3,
  firstChapter: 162,
  lastChapter: 746,
  characterClaims: "jsonl",
  aliasOf: "world-character/montressa-du-valeross",
  createdAt: "2026-09-03T04:21:31.925Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
