import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const cleavingAttack = {
  id: "01a06575-97fb-7370-beca-168f5db64306",
  type: "page-type/world-skill",
  slug: "cleaving-attack",
  title: "Cleaving Attack",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.571Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
