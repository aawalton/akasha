import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const summonJumpRamp = {
  id: "01a0657d-02fe-77e4-90fb-bd4fc4055a7f",
  type: "page-type/world-skill",
  slug: "summon-jump-ramp",
  title: "Summon Jump Ramp",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
