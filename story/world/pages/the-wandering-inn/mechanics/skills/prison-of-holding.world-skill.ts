import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const prisonOfHolding = {
  id: "01a0657d-0297-7cfd-84bc-cf67e97ef167",
  type: "page-type/world-skill",
  slug: "prison-of-holding",
  title: "Prison of Holding",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
