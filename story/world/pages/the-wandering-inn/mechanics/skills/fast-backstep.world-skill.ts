import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fastBackstep = {
  id: "01a06575-980b-7e16-9857-53b923222693",
  type: "page-type/world-skill",
  slug: "fast-backstep",
  title: "Fast Backstep",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
