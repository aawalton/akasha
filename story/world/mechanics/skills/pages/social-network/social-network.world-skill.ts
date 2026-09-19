import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const socialNetwork = {
  id: "01a0657d-02c7-70e0-8831-b5c24df8492c",
  type: "page-type/world-skill",
  slug: "social-network",
  title: "Social Network",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
