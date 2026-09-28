import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveViewingSpell = {
  id: "01a0e9f7-9e6e-76ec-9d79-72afe37b1fff",
  type: "page-type/world-spell",
  slug: "super-supportive-viewing-spell",
  title: "viewing spell",
  world: "world/super-supportive",
  aliases: ["view spell"],
  description: "A spell that sets up a short-lived viewpoint for watching a place.",
} as const satisfies WorldSpell
