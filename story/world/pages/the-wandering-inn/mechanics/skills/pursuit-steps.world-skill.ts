import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const pursuitSteps = {
  id: "01a0657d-029a-7110-8d84-efeaec487b0b",
  type: "page-type/world-skill",
  slug: "pursuit-steps",
  title: "Pursuit Steps",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
