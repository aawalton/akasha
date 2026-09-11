import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const satyrKick = {
  id: "01a0657d-02b7-7f1f-8a69-77ed665fa73d",
  type: "world-skill",
  slug: "satyr-kick",
  title: "Satyr Kick",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
