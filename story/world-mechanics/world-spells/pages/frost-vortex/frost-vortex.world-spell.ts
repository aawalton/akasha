import type { WorldSpell } from "../../world-spell.page-type.ts"

export const frostVortex = {
  id: "01a06572-95c5-79bf-a31b-4aade2ce9352",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "frost-vortex",
  title: "Frost Vortex",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
