import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveZoneIn = {
  id: "01a0e9f7-9e6e-70b6-bebd-875b3e2fc1e5",
  type: "page-type/world-spell",
  slug: "super-supportive-zone-in",
  title: "zone in",
  world: "world/super-supportive",
  aliases: ["focus chain"],
  description: "A wordchain that sharpens mental focus.",
} as const satisfies WorldSpell
