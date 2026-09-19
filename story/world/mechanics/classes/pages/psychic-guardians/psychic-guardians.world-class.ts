import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const psychicGuardians = {
  id: "01a06586-0a19-7abe-a7ef-3ec42fed8a38",
  type: "page-type/world-class",
  slug: "psychic-guardians",
  title: "Psychic Guardians",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
