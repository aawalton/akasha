import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const speedShot = {
  id: "01a0657d-02ed-7010-83cd-3d9a275eef0e",
  type: "page-type/world-skill",
  slug: "speed-shot",
  title: "Speed Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
