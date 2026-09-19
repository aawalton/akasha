import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const menisiDuMarquin = {
  id: "01a0b70b-e662-7382-a10f-3f333d0851c2",
  type: "page-type/world-character",
  slug: "menisi-du-marquin",
  title: "Princess Menisi du Marquin",
  world: "world/the-wandering-inn",
  firstChapter: 774,
  lastChapter: 774,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
