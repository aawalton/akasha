import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveRevertToReading = {
  id: "01a0e9f7-9e6e-7985-944c-c5d3feee0c9f",
  type: "page-type/world-spell",
  slug: "super-supportive-revert-to-reading",
  title: "Revert to Reading",
  world: "world/super-supportive",
  description: "A spell impression that moves an object back to a place it has been.",
} as const satisfies WorldSpell
