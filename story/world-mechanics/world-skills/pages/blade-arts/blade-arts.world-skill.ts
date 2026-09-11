import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const bladeArts = {
  id: "01a06575-97f5-7b52-a34b-8bc27b7a2174",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "blade-arts",
  title: "Blade Arts",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
