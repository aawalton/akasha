import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const holyShield = {
  id: "01a06575-981a-730d-8c43-177106f23cb9",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "holy-shield",
  title: "Holy Shield",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
