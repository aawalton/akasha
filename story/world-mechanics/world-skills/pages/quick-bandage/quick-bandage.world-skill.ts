import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const quickBandage = {
  id: "01a0657d-029b-7788-8c8c-df1c53a4119a",
  type: "world-skill",
  slug: "quick-bandage",
  title: "Quick Bandage",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
