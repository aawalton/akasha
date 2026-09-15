import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const flamespray = {
  id: "01a06572-95c3-7a3d-92b6-cc9691b3572f",
  type: "world-spell",
  slug: "flamespray",
  title: "Flamespray",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
