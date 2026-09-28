import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveFlashFreezingSpell = {
  id: "01a0e9f7-9e6d-7d73-abe8-b56b6770f787",
  type: "page-type/world-spell",
  slug: "super-supportive-flash-freezing-spell",
  title: "flash freezing spell",
  world: "world/super-supportive",
  aliases: ["freezing spell", "the popsicle maker"],
  description: "An auriad spell that freezes water.",
} as const satisfies WorldSpell
