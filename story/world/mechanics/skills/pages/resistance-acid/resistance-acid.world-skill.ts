import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const resistanceAcid = {
  id: "01a0657d-02b1-7c99-9e89-c7b5859016d9",
  type: "page-type/world-skill",
  slug: "resistance-acid",
  title: "Resistance: Acid",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
