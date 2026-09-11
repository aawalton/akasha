import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const impactGuard = {
  id: "01a06572-95cb-733e-aeec-50278eef2a3f",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "impact-guard",
  title: "Impact Guard",
  world: "the-wandering-inn",
} as const satisfies WorldSpell
