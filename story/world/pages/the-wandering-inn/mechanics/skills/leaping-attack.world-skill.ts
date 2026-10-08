import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const leapingAttack = {
  id: "01a06575-9822-7b5b-8589-ab290f7a483a",
  type: "page-type/world-skill",
  slug: "leaping-attack",
  title: "Leaping Attack",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.610Z",
  updatedAt: "2026-09-22T13:32:35.000Z",
} as const satisfies WorldSkill
