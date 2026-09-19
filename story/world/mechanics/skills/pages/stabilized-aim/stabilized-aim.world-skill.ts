import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const stabilizedAim = {
  id: "01a0657d-02ee-7a32-a7a1-8cea9dfa2409",
  type: "page-type/world-skill",
  slug: "stabilized-aim",
  title: "Stabilized Aim",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
