import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const watchCaptainIsl = {
  id: "01a0b70d-9aeb-7117-ba32-82d7736a6b62",
  type: "page-type/world-character",
  slug: "watch-captain-isl",
  title: "Watch Captain I'sl",
  world: "world/the-wandering-inn",
  firstChapter: 112,
  lastChapter: 112,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
