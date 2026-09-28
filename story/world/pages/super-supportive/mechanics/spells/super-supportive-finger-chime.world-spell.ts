import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveFingerChime = {
  id: "01a0e9f8-aa22-79d6-97e6-fe92d905f11f",
  type: "page-type/world-spell",
  slug: "super-supportive-finger-chime",
  title: "Finger chime",
  world: "world/super-supportive",
  description: 'A tiny spell that makes a clear "tinnng", abbreviated to bending one finger.',
} as const satisfies WorldSpell
