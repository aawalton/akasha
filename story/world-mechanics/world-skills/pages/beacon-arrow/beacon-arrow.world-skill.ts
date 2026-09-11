import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const beaconArrow = {
  id: "01a06575-97f4-7d14-813b-91f95847d24e",
  type: "world-skill",
  slug: "beacon-arrow",
  title: "Beacon Arrow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
