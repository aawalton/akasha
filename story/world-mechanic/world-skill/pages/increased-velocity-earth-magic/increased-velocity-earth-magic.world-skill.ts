import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const increasedVelocityEarthMagic = {
  id: "01a06575-981e-7113-bf83-7a584d285beb",
  type: "world-skill",
  slug: "increased-velocity-earth-magic",
  title: "Increased Velocity: Earth Magic",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
