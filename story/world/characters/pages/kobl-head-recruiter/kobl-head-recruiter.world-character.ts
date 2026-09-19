import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const koblHeadRecruiter = {
  id: "01a0b70b-6e9d-7fc8-a85f-a0bc7b2ea8fb",
  type: "page-type/world-character",
  slug: "kobl-head-recruiter",
  title: "Kobl",
  world: "world/the-wandering-inn",
  firstChapter: 799,
  lastChapter: 799,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
