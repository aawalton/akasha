import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rushingWallride = {
  id: "01a0657d-02b7-771c-8dae-83719b18db74",
  type: "page-type/world-skill",
  slug: "rushing-wallride",
  title: "Rushing Wallride",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
