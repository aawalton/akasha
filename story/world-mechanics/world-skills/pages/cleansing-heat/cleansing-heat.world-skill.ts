import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const cleansingHeat = {
  id: "01a06575-97fb-7dc3-9a84-86707d25465f",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "cleansing-heat",
  title: "Cleansing Heat",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
