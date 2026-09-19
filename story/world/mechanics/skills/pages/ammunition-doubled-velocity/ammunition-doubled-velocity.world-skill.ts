import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ammunitionDoubledVelocity = {
  id: "01a06575-97eb-7caa-ac65-3f983a58311b",
  type: "page-type/world-skill",
  slug: "ammunition-doubled-velocity",
  title: "Ammunition: Doubled Velocity",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
