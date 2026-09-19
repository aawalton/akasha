import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bullSRam = {
  id: "01a06575-97f9-7303-be59-dfce8f84d0bf",
  type: "page-type/world-skill",
  slug: "bull-s-ram",
  title: "Bull’s Ram",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
