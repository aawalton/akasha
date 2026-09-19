import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const weTookNoPrisoner = {
  id: "01a0657d-032d-7915-95ed-735e7365c47f",
  type: "page-type/world-skill",
  slug: "we-took-no-prisoner",
  title: "We Took No Prisoner",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
