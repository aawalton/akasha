import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const flurryStrikes = {
  id: "01a06575-980f-7e14-8b8a-f9aee70b4c51",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "flurry-strikes",
  title: "Flurry Strikes",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
