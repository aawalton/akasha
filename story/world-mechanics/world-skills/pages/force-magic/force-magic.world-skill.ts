import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const forceMagic = {
  id: "01a06575-980f-72c5-930c-503ae7987f96",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "force-magic",
  title: "Force Magic",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
