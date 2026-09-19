import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const wildCall = {
  id: "01a0657d-032e-750a-b177-f678cf3f236b",
  type: "page-type/world-skill",
  slug: "wild-call",
  title: "Wild Call",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
