import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveAntitargetingSpell = {
  id: "01a0e9f6-d518-70b7-b0c4-e463a777dc6d",
  type: "page-type/world-spell",
  slug: "super-supportive-antitargeting-spell",
  title: "antitargeting spell",
  world: "world/super-supportive",
  description: "An Adjuster spell that hinders being targeted.",
} as const satisfies WorldSpell
