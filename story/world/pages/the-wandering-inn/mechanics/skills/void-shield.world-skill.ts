import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const voidShield = {
  id: "01a0657d-0321-73c2-89b4-2dd2335fa94c",
  type: "page-type/world-skill",
  slug: "void-shield",
  title: "Void Shield",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
