import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const orbOfForce = {
  id: "01a06572-95da-79cd-984c-b0c29d0ec2f6",
  type: "world-spell",
  slug: "orb-of-force",
  title: "Orb of Force",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
