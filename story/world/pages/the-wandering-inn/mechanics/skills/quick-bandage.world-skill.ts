import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quickBandage = {
  id: "01a0657d-029b-7788-8c8c-df1c53a4119a",
  type: "page-type/world-skill",
  slug: "quick-bandage",
  title: "Quick Bandage",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.619Z",
  updatedAt: "2026-09-22T13:33:00.000Z",
} as const satisfies WorldSkill
