import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const distractingCough = {
  id: "01a06575-9804-7924-8882-c9e8b1de6455",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "distracting-cough",
  title: "Distracting Cough",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
