import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fastLegSweep = {
  id: "01a06575-980b-784a-afa6-dfd2bef6d00f",
  type: "page-type/world-skill",
  slug: "fast-leg-sweep",
  title: "Fast Leg Sweep",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
