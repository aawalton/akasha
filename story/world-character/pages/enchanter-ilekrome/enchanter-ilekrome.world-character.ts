import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const enchanterIlekrome = {
  id: "01a0b70a-6d85-7ed2-af4f-9db06296de29",
  type: "page-type/world-character",
  slug: "enchanter-ilekrome",
  title: "Enchanter Ilekrome",
  world: "world/the-wandering-inn",
  firstChapter: 515,
  lastChapter: 515,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
