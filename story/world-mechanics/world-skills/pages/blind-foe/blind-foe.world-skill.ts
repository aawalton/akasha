import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const blindFoe = {
  id: "01a06575-97f6-741f-b7ba-d400aab09e20",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "blind-foe",
  title: "Blind Foe",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
