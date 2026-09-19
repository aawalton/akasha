import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const swordswomanSDive = {
  id: "01a0657d-0307-7936-ab56-82a6808773f1",
  type: "page-type/world-skill",
  slug: "swordswoman-s-dive",
  title: "Swordswoman’s Dive",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
