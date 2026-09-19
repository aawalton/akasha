import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const telivWitherscale = {
  id: "01a0b70d-14f4-7c5a-b64d-6bb3908a6fd4",
  type: "page-type/world-character",
  slug: "teliv-witherscale",
  title: "Teliv",
  world: "world/the-wandering-inn",
  firstChapter: 366,
  lastChapter: 366,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
