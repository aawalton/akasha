import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const vanguardHaste = {
  id: "01a0657d-0320-7dae-93ea-6c754d0e774f",
  type: "page-type/world-skill",
  slug: "vanguard-haste",
  title: "Vanguard: Haste",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.752Z",
  updatedAt: "2026-09-22T13:33:42.000Z",
} as const satisfies WorldSkill
