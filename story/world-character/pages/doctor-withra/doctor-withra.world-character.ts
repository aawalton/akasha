import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const doctorWithra = {
  id: "01a0b70a-1a41-762d-b951-023877ba6831",
  type: "page-type/world-character",
  slug: "doctor-withra",
  title: "Doctor Withra",
  world: "world/the-wandering-inn",
  firstChapter: 756,
  lastChapter: 756,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
