import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const tauntingWarcry = {
  id: "01a0657d-0310-701c-9fc5-4957c552b820",
  type: "page-type/world-skill",
  slug: "taunting-warcry",
  title: "Taunting Warcry",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
