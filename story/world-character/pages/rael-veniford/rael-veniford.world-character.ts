import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const raelVeniford = {
  id: "01a0b70c-7fc0-7984-b1db-d77778c1d287",
  type: "page-type/world-character",
  slug: "rael-veniford",
  title: "Rael Veniford",
  world: "world/the-wandering-inn",
  firstChapter: 252,
  lastChapter: 252,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
