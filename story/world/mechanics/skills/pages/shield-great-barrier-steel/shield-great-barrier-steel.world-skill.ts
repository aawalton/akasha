import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shieldGreatBarrierSteel = {
  id: "01a0657d-02c0-700c-96d6-2d0c0e734743",
  type: "page-type/world-skill",
  slug: "shield-great-barrier-steel",
  title: "Shield: Great Barrier (Steel)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
