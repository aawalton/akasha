import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const expertAlchemy = {
  id: "01a06575-980a-7910-9bf5-43210e59d622",
  type: "world-skill",
  slug: "expert-alchemy",
  title: "Expert Alchemy",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
