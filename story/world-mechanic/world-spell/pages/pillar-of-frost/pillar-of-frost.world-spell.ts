import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const pillarOfFrost = {
  id: "01a06572-95da-71ab-816e-c51c541d043d",
  type: "world-spell",
  slug: "pillar-of-frost",
  title: "Pillar of Frost",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
