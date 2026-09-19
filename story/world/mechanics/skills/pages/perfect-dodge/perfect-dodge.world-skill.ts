import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const perfectDodge = {
  id: "01a0657d-028f-7dc8-93e0-d23e6facd640",
  type: "page-type/world-skill",
  slug: "perfect-dodge",
  title: "Perfect Dodge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
