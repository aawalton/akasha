import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const barbarianConstitution = {
  id: "01a06575-97f3-7094-92cc-eef0fdb12f4c",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "barbarian-constitution",
  title: "Barbarian Constitution",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
