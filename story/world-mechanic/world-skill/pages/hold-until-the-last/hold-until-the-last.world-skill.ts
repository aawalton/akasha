import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const holdUntilTheLast = {
  id: "01a06575-981a-7e73-af06-d1e03098062d",
  type: "world-skill",
  slug: "hold-until-the-last",
  title: "Hold Until The Last",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
