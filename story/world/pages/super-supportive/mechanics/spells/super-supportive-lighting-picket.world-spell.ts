import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveLightingPicket = {
  id: "01a0e9f7-9e6e-7601-861d-f319c3896f93",
  type: "page-type/world-spell",
  slug: "super-supportive-lighting-picket",
  title: "Lighting Picket",
  world: "world/super-supportive",
  description: "An electricity spell impression.",
} as const satisfies WorldSpell
