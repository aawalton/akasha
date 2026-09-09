import type { WorldSpell } from "../../world-spell.page-type.ts"

export const volcanicEruption = {
  id: "01a06572-95e8-7e87-8f28-220c8def61f6",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "volcanic-eruption",
  title: "Volcanic Eruption",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
