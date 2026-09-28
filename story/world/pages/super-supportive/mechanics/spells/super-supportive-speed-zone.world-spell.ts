import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveSpeedZone = {
  id: "01a0e9f6-d518-74fe-b9e5-aac1cedb1c51",
  type: "page-type/world-spell",
  slug: "super-supportive-speed-zone",
  title: "speed zone",
  world: "world/super-supportive",
  description: "A zone spell impression that triples the pace of those inside it.",
} as const satisfies WorldSpell
