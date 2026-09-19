import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const smokerSLungs = {
  id: "01a0657d-02c7-79a5-9db5-881ac6c162c2",
  type: "page-type/world-skill",
  slug: "smoker-s-lungs",
  title: "Smoker’s Lungs",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
