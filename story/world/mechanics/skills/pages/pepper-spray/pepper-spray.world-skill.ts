import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const pepperSpray = {
  id: "01a0657d-028e-7362-b95e-1d2807df619b",
  type: "page-type/world-skill",
  slug: "pepper-spray",
  title: "Pepper Spray",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
