import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bravehearts = {
  id: "01a06575-97f8-791f-ad1f-2ae40624fcfa",
  type: "page-type/world-skill",
  slug: "bravehearts",
  title: "Bravehearts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
