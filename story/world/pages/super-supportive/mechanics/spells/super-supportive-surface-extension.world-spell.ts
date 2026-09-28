import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveSurfaceExtension = {
  id: "01a0e9f7-9e6e-735c-afc1-36a2e0f2ce8b",
  type: "page-type/world-spell",
  slug: "super-supportive-surface-extension",
  title: "Surface Extension",
  world: "world/super-supportive",
  description: "A speedster spell impression.",
} as const satisfies WorldSpell
