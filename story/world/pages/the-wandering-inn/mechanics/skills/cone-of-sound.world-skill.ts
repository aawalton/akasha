import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const coneOfSound = {
  id: "01a06575-97fc-7951-ab25-077a8920d972",
  type: "page-type/world-skill",
  slug: "cone-of-sound",
  title: "Cone of Sound",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
