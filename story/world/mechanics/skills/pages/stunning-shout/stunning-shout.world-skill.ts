import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const stunningShout = {
  id: "01a0657d-02fe-7652-ad4b-37529efe92ea",
  type: "page-type/world-skill",
  slug: "stunning-shout",
  title: "Stunning Shout",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
