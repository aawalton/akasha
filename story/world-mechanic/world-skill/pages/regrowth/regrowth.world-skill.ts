import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const regrowth = {
  id: "01a0657d-02a6-7c55-b4d2-5352fc24fab4",
  type: "world-skill",
  slug: "regrowth",
  title: "Regrowth",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
