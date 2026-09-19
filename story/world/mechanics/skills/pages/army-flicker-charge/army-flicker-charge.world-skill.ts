import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const armyFlickerCharge = {
  id: "01a06575-97ed-76bb-bbb6-732371338739",
  type: "page-type/world-skill",
  slug: "army-flicker-charge",
  title: "Army: Flicker Charge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
