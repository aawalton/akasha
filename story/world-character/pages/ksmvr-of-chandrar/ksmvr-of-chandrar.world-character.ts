import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ksmvrOfChandrar = {
  id: "01a0b70b-7136-7626-bd95-efb8c0248b05",
  type: "page-type/world-character",
  slug: "ksmvr-of-chandrar",
  title: "Ksmvr of Chandrar",
  world: "world/the-wandering-inn",
  firstChapter: 553,
  lastChapter: 553,
  characterClaims: "jsonl",
  aliasOf: "world-character/ksmvr",
} as const satisfies WorldCharacter
