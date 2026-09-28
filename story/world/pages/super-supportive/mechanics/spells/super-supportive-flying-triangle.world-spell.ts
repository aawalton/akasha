import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveFlyingTriangle = {
  id: "01a0e9f7-9e6d-7b8f-8ad8-a6e3a34a4bc3",
  type: "page-type/world-spell",
  slug: "super-supportive-flying-triangle",
  title: "flying triangle",
  world: "world/super-supportive",
  aliases: ["cutting spell", "flying dagger of force"],
  description: "An auriad spell that sends a triangle of magic flying like a dagger.",
} as const satisfies WorldSpell
