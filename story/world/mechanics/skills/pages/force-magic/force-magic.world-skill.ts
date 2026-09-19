import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const forceMagic = {
  id: "01a06575-980f-72c5-930c-503ae7987f96",
  type: "page-type/world-skill",
  slug: "force-magic",
  title: "Force Magic",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
