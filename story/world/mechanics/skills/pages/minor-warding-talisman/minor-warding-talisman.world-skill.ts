import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const minorWardingTalisman = {
  id: "01a0657d-024d-758c-b10d-760f64947ce4",
  type: "page-type/world-skill",
  slug: "minor-warding-talisman",
  title: "Minor Warding Talisman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
