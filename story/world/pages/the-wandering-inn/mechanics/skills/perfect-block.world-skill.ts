import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const perfectBlock = {
  id: "01a0657d-028e-7e30-aa3d-680d5395ad8d",
  type: "page-type/world-skill",
  slug: "perfect-block",
  title: "Perfect Block",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
