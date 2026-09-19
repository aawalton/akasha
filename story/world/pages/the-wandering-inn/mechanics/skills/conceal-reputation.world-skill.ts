import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const concealReputation = {
  id: "01a06575-97fc-725b-a854-aa9cea7036d0",
  type: "page-type/world-skill",
  slug: "conceal-reputation",
  title: "Conceal Reputation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
