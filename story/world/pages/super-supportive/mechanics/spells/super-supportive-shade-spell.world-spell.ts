import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveShadeSpell = {
  id: "01a0e9f8-aa23-755b-aade-bc85608d1053",
  type: "page-type/world-spell",
  slug: "super-supportive-shade-spell",
  title: "Shade spell",
  world: "world/super-supportive",
  description:
    "A murmured auriad spell, cast with hands hidden, that drops the temperature about ten degrees.",
} as const satisfies WorldSpell
