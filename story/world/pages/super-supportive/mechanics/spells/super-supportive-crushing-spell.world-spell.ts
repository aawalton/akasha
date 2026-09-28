import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveCrushingSpell = {
  id: "01a0e9f2-f147-77ac-90ad-d99beb2b724f",
  type: "page-type/world-spell",
  slug: "super-supportive-crushing-spell",
  title: "Crushing spell",
  world: "world/super-supportive",
  aliases: ["hydraulic press spell", "sphere crush", "pancake crush"],
  description:
    'A short-range auriad spell that crushes an apple-sized area, rated for "even a stubborn stone".',
} as const satisfies WorldSpell
