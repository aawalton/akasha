import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const massAnimateInvisibleGhouls = {
  id: "01a06572-95d1-735c-a08b-c54496e891b8",
  type: "page-type/world-spell",
  slug: "mass-animate-invisible-ghouls",
  title: "Mass Animate Invisible Ghouls",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
