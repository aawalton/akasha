import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const summonJumpRamp = {
  id: "01a0657d-02fe-77e4-90fb-bd4fc4055a7f",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "summon-jump-ramp",
  title: "Summon Jump Ramp",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
