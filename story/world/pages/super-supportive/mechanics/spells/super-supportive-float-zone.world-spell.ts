import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveFloatZone = {
  id: "01a0e9f6-d518-7ad4-9b64-dd3b552a0835",
  type: "page-type/world-spell",
  slug: "super-supportive-float-zone",
  title: "float zone",
  world: "world/super-supportive",
  description: "A zone spell impression that works like an invisible swimming pool.",
} as const satisfies WorldSpell
