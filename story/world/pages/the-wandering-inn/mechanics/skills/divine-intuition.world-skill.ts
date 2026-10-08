import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const divineIntuition = {
  id: "01a06575-9804-7a9c-8d5f-f8a98fbe45d6",
  type: "page-type/world-skill",
  slug: "divine-intuition",
  title: "Divine Intuition",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.580Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
