import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const holdFire = {
  id: "01a06575-981a-7819-b572-d18912eb79ee",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "hold-fire",
  title: "Hold Fire",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
