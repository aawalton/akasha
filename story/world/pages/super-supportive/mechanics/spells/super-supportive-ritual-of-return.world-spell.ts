import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveRitualOfReturn = {
  id: "01a0e9f2-f149-7c9f-b97b-e76eee90b3c6",
  type: "page-type/world-spell",
  slug: "super-supportive-ritual-of-return",
  title: "Ritual of Return",
  world: "world/super-supportive",
  aliases: ["ship teleport spell"],
  description:
    "A ship's teleport spell, legally authorized, that sends a person back to a Contract.",
} as const satisfies WorldSpell
