import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const montressaDuValeros = {
  id: "01a0b70b-f556-78c5-89af-b626d5854a43",
  type: "page-type/world-character",
  slug: "montressa-du-valeros",
  title: "Montressa du Valeros",
  world: "world/the-wandering-inn",
  firstChapter: 275,
  lastChapter: 275,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
