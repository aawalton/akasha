import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const extraActionPoints = {
  id: "01a06575-980a-71de-9be2-321936d43550",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "extra-action-points",
  title: "Extra Action Points",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
