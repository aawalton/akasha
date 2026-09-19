import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superiorBalance = {
  id: "01a0657d-0302-7441-819b-79825fb6611d",
  type: "page-type/world-skill",
  slug: "superior-balance",
  title: "Superior Balance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
