import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const quickAssembly = {
  id: "01a0657d-029b-7b96-95b1-d4bfbd02097b",
  type: "world-skill",
  slug: "quick-assembly",
  title: "Quick Assembly",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
