import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const reviveGolemAutonomous = {
  id: "01a0657d-02b2-726b-8b69-c3696f3b7986",
  type: "page-type/world-skill",
  slug: "revive-golem-autonomous",
  title: "Revive Golem (Autonomous)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
