import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const flurryOfStrikes = {
  id: "01a06575-980f-7608-81e4-101b8190b851",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "flurry-of-strikes",
  title: "Flurry of Strikes",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
