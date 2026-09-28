import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveThunderGarden = {
  id: "01a0e9f7-9e6e-78d2-b9e7-52c52d4b1930",
  type: "page-type/world-spell",
  slug: "super-supportive-thunder-garden",
  title: "Thunder Garden",
  world: "world/super-supportive",
  description: "An electricity spell impression.",
} as const satisfies WorldSpell
