import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const continuousSpearThrusts = {
  id: "01a06575-97fd-70c5-819f-1053dfc3cc14",
  type: "page-type/world-skill",
  slug: "continuous-spear-thrusts",
  title: "Continuous Spear Thrusts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
