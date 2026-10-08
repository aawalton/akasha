import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const disarmingParry = {
  id: "01a06575-9804-79d2-b329-7a03b45612a4",
  type: "page-type/world-skill",
  slug: "disarming-parry",
  title: "Disarming Parry",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.580Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
