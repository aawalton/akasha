import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fleetfootGrill = {
  id: "01a06575-980e-71f8-84e8-64462663cdc8",
  type: "page-type/world-skill",
  slug: "fleetfoot-grill",
  title: "Fleetfoot Grill",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
