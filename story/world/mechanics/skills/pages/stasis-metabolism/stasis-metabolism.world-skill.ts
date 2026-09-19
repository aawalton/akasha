import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const stasisMetabolism = {
  id: "01a0657d-02ee-7055-bb60-b457f5cad5ff",
  type: "page-type/world-skill",
  slug: "stasis-metabolism",
  title: "Stasis Metabolism",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
