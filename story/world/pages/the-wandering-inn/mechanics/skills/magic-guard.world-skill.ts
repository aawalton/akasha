import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const magicGuard = {
  id: "01a0657d-0241-7f1d-abfa-7d0b2e8214d7",
  type: "page-type/world-skill",
  slug: "magic-guard",
  title: "Magic Guard",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.529Z",
  updatedAt: "2026-09-22T13:32:44.000Z",
} as const satisfies WorldSkill
