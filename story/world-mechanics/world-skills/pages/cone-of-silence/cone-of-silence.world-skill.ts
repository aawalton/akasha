import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const coneOfSilence = {
  id: "01a06575-97fc-7936-868a-443e4857bdad",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "cone-of-silence",
  title: "Cone of Silence",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
