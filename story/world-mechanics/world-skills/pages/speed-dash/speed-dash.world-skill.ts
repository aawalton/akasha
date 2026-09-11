import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const speedDash = {
  id: "01a0657d-02ed-7d3c-bb70-ae038d5a5a89",
  type: "world-skill",
  slug: "speed-dash",
  title: "Speed Dash",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
