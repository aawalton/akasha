import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const resistanceIntoxication = {
  id: "01a0657d-02b1-7144-8dfe-51fde03aa8f3",
  type: "page-type/world-skill",
  slug: "resistance-intoxication",
  title: "Resistance: Intoxication",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
