import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveHarmony = {
  id: "01a0e9f7-9e6e-7165-85f6-d03fe4526d1e",
  type: "page-type/world-spell",
  slug: "super-supportive-harmony",
  title: "Harmony",
  world: "world/super-supportive",
  description: "A wordchain.",
} as const satisfies WorldSpell
