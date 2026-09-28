import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveTreadmillZone = {
  id: "01a0e9f6-d518-7665-8a62-355789490e62",
  type: "page-type/world-spell",
  slug: "super-supportive-treadmill-zone",
  title: "Treadmill Zone",
  world: "world/super-supportive",
  aliases: ["trap zone", "treadmill trap"],
  description: "A trap zone in which a person runs without moving forward.",
} as const satisfies WorldSpell
