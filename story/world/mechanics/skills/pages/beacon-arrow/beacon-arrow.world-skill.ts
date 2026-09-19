import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const beaconArrow = {
  id: "01a06575-97f4-7d14-813b-91f95847d24e",
  type: "page-type/world-skill",
  slug: "beacon-arrow",
  title: "Beacon Arrow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
