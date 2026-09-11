import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const rogueTrap = {
  id: "01a0657d-02b6-725d-90da-01b9a4a7478c",
  type: "world-skill",
  slug: "rogue-trap",
  title: "Rogue Trap",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
