import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const evilEye = {
  id: "01a06575-9809-7aa1-ac3e-217888b51b99",
  type: "page-type/world-skill",
  slug: "evil-eye",
  title: "Evil Eye",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.585Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
