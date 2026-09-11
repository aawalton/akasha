import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const rayOfForce = {
  id: "01a06572-95dc-7fe1-adf1-e7702ceda02c",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "ray-of-force",
  title: "Ray of Force",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
