import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const skysplittingClap = {
  id: "01a0657d-02c6-7647-93d0-2ea6f3ac0ccf",
  type: "page-type/world-skill",
  slug: "skysplitting-clap",
  title: "Skysplitting Clap",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
