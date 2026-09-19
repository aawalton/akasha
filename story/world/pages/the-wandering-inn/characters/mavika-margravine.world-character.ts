import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const mavikaMargravine = {
  id: "01a0b70b-df6a-7561-a954-ee3283356da6",
  type: "page-type/world-character",
  slug: "mavika-margravine",
  title: "Mavika",
  world: "world/the-wandering-inn",
  firstChapter: 715,
  lastChapter: 715,
  characterClaims: "jsonl",
  aliasOf: "world-character/mavika",
} as const satisfies WorldCharacter
