import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const eyesOfAppraisal = {
  id: "01a06575-980b-713a-8e2b-624bfde76107",
  type: "page-type/world-skill",
  slug: "eyes-of-appraisal",
  title: "Eyes of Appraisal",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
