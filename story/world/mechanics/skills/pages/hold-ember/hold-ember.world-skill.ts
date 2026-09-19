import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const holdEmber = {
  id: "01a06575-981a-76dd-b50b-49dceeda3c38",
  type: "page-type/world-skill",
  slug: "hold-ember",
  title: "Hold Ember",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
