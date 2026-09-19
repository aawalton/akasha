import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const armorCaptainShailt = {
  id: "01a0b707-71ce-7184-9d86-b686a153c284",
  type: "page-type/world-character",
  slug: "armor-captain-shailt",
  title: "Armor Captain Shailt",
  world: "world/the-wandering-inn",
  firstChapter: 335,
  lastChapter: 335,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
