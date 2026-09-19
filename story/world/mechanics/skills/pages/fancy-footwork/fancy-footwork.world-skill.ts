import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fancyFootwork = {
  id: "01a06575-980b-78f1-acba-3a891d0903c0",
  type: "page-type/world-skill",
  slug: "fancy-footwork",
  title: "Fancy Footwork",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
