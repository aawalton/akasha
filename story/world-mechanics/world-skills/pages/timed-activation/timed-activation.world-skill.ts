import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const timedActivation = {
  id: "01a0657d-0315-7bb4-b2d6-901be6026a11",
  type: "world-skill",
  slug: "timed-activation",
  title: "Timed Activation",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
