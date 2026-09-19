import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const crossbowIrregularAmmunitionStones = {
  id: "01a06575-97ff-777f-8076-c83b96842249",
  type: "page-type/world-skill",
  slug: "crossbow-irregular-ammunition-stones",
  title: "Crossbow: Irregular Ammunition (Stones)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
