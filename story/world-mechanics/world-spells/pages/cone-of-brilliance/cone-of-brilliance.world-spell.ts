import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const coneOfBrilliance = {
  id: "01a06572-95b9-7081-ac5f-1915c04d3742",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "cone-of-brilliance",
  title: "Cone of Brilliance",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
