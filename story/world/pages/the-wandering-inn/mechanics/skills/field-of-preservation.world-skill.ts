import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fieldOfPreservation = {
  id: "01a06575-980c-7731-accf-0c686c1a160d",
  type: "page-type/world-skill",
  slug: "field-of-preservation",
  title: "Field of Preservation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
