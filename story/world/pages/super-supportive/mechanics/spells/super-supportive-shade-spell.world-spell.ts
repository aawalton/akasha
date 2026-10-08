import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveShadeSpell = {
  id: "01a0e9f8-aa23-755b-aade-bc85608d1053",
  type: "page-type/world-spell",
  slug: "super-supportive-shade-spell",
  title: "Shade spell",
  world: "world/super-supportive",
  description:
    "A murmured auriad spell, cast with hands hidden, that drops the temperature about ten degrees.",
  createdAt: "2026-09-28T21:43:02.947Z",
  updatedAt: "2026-09-28T21:43:06.000Z",
} as const satisfies WorldSpell
