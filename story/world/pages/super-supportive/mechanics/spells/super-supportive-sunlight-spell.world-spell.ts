import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveSunlightSpell = {
  id: "01a0e9f7-9e6e-714c-817f-6a4b2a4cfbf6",
  type: "page-type/world-spell",
  slug: "super-supportive-sunlight-spell",
  title: "sunlight spell",
  world: "world/super-supportive",
  description: "An auriad spell that calls real, warm sunlight.",
} as const satisfies WorldSpell
