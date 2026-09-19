import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const extendedAuraGravityWell = {
  id: "01a06575-980a-7afa-83fc-c0cccd5aa643",
  type: "page-type/world-skill",
  slug: "extended-aura-gravity-well",
  title: "Extended Aura: Gravity Well",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
