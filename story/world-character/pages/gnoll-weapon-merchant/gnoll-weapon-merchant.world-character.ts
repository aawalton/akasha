import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const gnollWeaponMerchant = {
  id: "01a0b70a-a0d9-7941-bc3b-6bfb09a34530",
  type: "page-type/world-character",
  slug: "gnoll-weapon-merchant",
  title: "the Gnoll weapon shopkeeper",
  world: "world/the-wandering-inn",
  firstChapter: 44,
  lastChapter: 44,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
