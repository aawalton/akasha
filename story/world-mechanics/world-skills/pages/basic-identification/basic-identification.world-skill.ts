import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const basicIdentification = {
  id: "01a06575-97f3-773a-a9e4-9ca7d1cd7fc2",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "basic-identification",
  title: "Basic Identification",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
