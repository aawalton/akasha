import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const deathstepLandmine = {
  id: "01a06575-9802-71a1-b097-b02f6c20139d",
  type: "page-type/world-skill",
  slug: "deathstep-landmine",
  title: "Deathstep Landmine",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
