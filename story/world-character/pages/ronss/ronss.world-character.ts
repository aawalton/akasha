import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ronss = {
  id: "01a0b70c-9cbb-7c6a-90e3-d6aff18238a0",
  type: "page-type/world-character",
  slug: "ronss",
  title: "Ronss",
  world: "world/the-wandering-inn",
  firstChapter: 779,
  lastChapter: 779,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
