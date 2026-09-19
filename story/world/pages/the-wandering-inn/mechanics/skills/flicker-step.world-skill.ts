import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flickerStep = {
  id: "01a06575-980e-74be-b2cb-9dd38fc66298",
  type: "page-type/world-skill",
  slug: "flicker-step",
  title: "Flicker Step",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
