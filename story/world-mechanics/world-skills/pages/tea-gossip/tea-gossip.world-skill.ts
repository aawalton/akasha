import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const teaGossip = {
  id: "01a0657d-0310-713f-98f0-2d4746298c26",
  type: "world-skill",
  slug: "tea-gossip",
  title: "Tea Gossip",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
