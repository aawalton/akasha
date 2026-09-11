import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const hammerSBlow = {
  id: "01a06575-9818-72c8-bf9d-4f7af8c82728",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "hammer-s-blow",
  title: "Hammer’s Blow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
