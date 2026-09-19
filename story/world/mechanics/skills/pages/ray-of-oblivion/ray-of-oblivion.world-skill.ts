import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rayOfOblivion = {
  id: "01a0657d-02a4-7809-ad3f-980007b02c66",
  type: "page-type/world-skill",
  slug: "ray-of-oblivion",
  title: "Ray of Oblivion",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
