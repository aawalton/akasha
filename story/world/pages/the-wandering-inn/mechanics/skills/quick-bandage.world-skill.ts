import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quickBandage = {
  id: "01a0657d-029b-7788-8c8c-df1c53a4119a",
  type: "page-type/world-skill",
  slug: "quick-bandage",
  title: "Quick Bandage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
