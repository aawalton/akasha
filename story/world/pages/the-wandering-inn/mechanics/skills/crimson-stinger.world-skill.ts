import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const crimsonStinger = {
  id: "01a06575-97ff-7024-8052-abd517f5e494",
  type: "page-type/world-skill",
  slug: "crimson-stinger",
  title: "Crimson Stinger",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
