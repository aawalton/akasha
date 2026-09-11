import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const fluffedFur = {
  id: "01a06575-980f-7f08-b2bc-46a24591dd03",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "fluffed-fur",
  title: "Fluffed Fur",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
