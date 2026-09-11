import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const bracedShield = {
  id: "01a06575-97f8-7714-adde-e6e1c1828f23",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "braced-shield",
  title: "Braced Shield",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
