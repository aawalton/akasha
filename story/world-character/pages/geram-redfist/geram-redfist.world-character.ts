import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const geramRedfist = {
  id: "01a0b70a-9b90-76f1-8c17-60770178ace2",
  type: "page-type/world-character",
  slug: "geram-redfist",
  title: "Geram Redfist",
  world: "world/the-wandering-inn",
  firstChapter: 221,
  lastChapter: 221,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
