import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const goldenRemuneration = {
  id: "01a06575-9815-7ec8-bc62-45926f6416fe",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "golden-remuneration",
  title: "Golden Remuneration",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
