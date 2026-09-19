import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const slamKick = {
  id: "01a0657d-02c6-7a79-9425-f7d1ef3648da",
  type: "page-type/world-skill",
  slug: "slam-kick",
  title: "Slam Kick",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
