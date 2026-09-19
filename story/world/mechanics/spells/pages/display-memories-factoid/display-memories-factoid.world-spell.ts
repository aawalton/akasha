import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const displayMemoriesFactoid = {
  id: "01a06572-95be-7d0e-a18e-0c9fa3c0ec2a",
  type: "page-type/world-spell",
  slug: "display-memories-factoid",
  title: "Display Memories: Factoid",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
