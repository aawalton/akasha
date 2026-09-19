import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const affairOfHonor = {
  id: "01a06575-97ea-7b37-9baf-0f9a0138f35b",
  type: "page-type/world-skill",
  slug: "affair-of-honor",
  title: "Affair of Honor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
