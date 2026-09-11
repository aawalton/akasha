import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const basicRepair = {
  id: "01a06575-97f4-73d8-8f2e-2898f9137532",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "basic-repair",
  title: "Basic Repair",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
