import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveIceOver = {
  id: "01a0e9f2-f148-7011-baf5-eae82cb079d0",
  type: "page-type/world-spell",
  slug: "super-supportive-ice-over",
  title: "Ice Over",
  world: "world/super-supportive",
  description: "An Adjuster spell.",
} as const satisfies WorldSpell
