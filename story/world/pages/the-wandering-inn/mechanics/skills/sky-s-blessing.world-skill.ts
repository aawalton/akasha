import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const skySBlessing = {
  id: "01a0657d-02c6-7ac2-a76a-2a191018b9ff",
  type: "page-type/world-skill",
  slug: "sky-s-blessing",
  title: "Sky’s Blessing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
