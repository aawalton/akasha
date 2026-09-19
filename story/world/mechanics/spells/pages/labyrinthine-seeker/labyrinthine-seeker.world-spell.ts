import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const labyrinthineSeeker = {
  id: "01a06572-95cc-7372-848f-0d9356298440",
  type: "page-type/world-spell",
  slug: "labyrinthine-seeker",
  title: "Labyrinthine Seeker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
