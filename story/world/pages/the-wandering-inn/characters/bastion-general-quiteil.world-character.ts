import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const bastionGeneralQuiteil = {
  id: "01a0b707-7c25-7658-ad14-14d44fd28563",
  type: "page-type/world-character",
  slug: "bastion-general-quiteil",
  title: "Quiteil",
  world: "world/the-wandering-inn",
  firstChapter: 437,
  lastChapter: 799,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
