import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const resistanceSleep = {
  id: "01a0657d-02b1-7306-8ac9-ba31044e455c",
  type: "page-type/world-skill",
  slug: "resistance-sleep",
  title: "Resistance: Sleep",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
