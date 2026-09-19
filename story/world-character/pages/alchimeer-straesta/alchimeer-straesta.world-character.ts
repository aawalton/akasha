import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const alchimeerStraesta = {
  id: "01a0b707-67dd-725a-a434-49149b3dfb21",
  type: "page-type/world-character",
  slug: "alchimeer-straesta",
  title: "Alchimeer Straesta",
  world: "world/the-wandering-inn",
  firstChapter: 515,
  lastChapter: 515,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
