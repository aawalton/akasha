import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const windCutter = {
  id: "01a0657d-0336-7b04-b376-ce4148b6cac6",
  type: "world-skill",
  slug: "wind-cutter",
  title: "Wind Cutter",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
