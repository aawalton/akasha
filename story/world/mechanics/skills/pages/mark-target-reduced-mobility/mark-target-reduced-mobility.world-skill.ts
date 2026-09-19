import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const markTargetReducedMobility = {
  id: "01a0657d-024b-7233-ad80-dc7cb10f4b61",
  type: "page-type/world-skill",
  slug: "mark-target-reduced-mobility",
  title: "Mark Target: Reduced Mobility",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
