import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const sprayOfNeedles = {
  id: "01a06572-95e2-7e41-8fcb-cf767623c061",
  type: "page-type/world-spell",
  slug: "spray-of-needles",
  title: "Spray of Needles",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
