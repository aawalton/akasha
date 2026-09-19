import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const fleetNavigatorVorrmen = {
  id: "01a0b70a-89d1-701a-af41-0cc34a062c28",
  type: "page-type/world-character",
  slug: "fleet-navigator-vorrmen",
  title: "Vorrmen",
  world: "world/the-wandering-inn",
  firstChapter: 646,
  lastChapter: 646,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
