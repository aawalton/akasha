import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const increasedVelocityEarthMagic = {
  id: "01a06575-981e-7113-bf83-7a584d285beb",
  type: "page-type/world-skill",
  slug: "increased-velocity-earth-magic",
  title: "Increased Velocity: Earth Magic",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
