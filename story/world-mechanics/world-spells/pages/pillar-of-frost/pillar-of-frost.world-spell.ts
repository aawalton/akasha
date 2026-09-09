import type { WorldSpell } from "../../world-spell.page-type.ts"

export const pillarOfFrost = {
  id: "01a06572-95da-71ab-816e-c51c541d043d",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "pillar-of-frost",
  title: "Pillar of Frost",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
