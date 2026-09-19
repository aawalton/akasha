import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rekindleFlame = {
  id: "01a0657d-02b0-78d2-838a-0336fb2bf384",
  type: "page-type/world-skill",
  slug: "rekindle-flame",
  title: "Rekindle Flame",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
