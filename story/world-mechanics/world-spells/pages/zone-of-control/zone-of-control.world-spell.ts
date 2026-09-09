import type { WorldSpell } from "../../world-spell.page-type.ts"

export const zoneOfControl = {
  id: "01a06572-95ea-7f94-876d-1b603f227199",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "zone-of-control",
  title: "Zone of Control",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
