import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const slaveLadyAndra = {
  id: "01a0b70d-0554-7364-8122-c95c54b71a69",
  type: "page-type/world-character",
  slug: "slave-lady-andra",
  title: "Slave Lady Andra",
  world: "world/the-wandering-inn",
  firstChapter: 799,
  lastChapter: 799,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
