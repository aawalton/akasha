import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const fortuneBleeds = {
  id: "01a06575-9810-700f-ba41-fd4c1719ad0e",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "fortune-bleeds",
  title: "Fortune Bleeds",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
