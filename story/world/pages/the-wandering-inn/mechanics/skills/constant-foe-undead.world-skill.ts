import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const constantFoeUndead = {
  id: "01a06575-97fd-75f6-9783-287a7cff1597",
  type: "page-type/world-skill",
  slug: "constant-foe-undead",
  title: "Constant Foe (Undead)",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.573Z",
  updatedAt: "2026-09-22T13:31:56.000Z",
} as const satisfies WorldSkill
