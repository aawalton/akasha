import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const groundElectricity = {
  id: "01a06575-9817-7ff7-b0cc-6238f0e5149a",
  type: "page-type/world-skill",
  slug: "ground-electricity",
  title: "Ground Electricity",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.599Z",
  updatedAt: "2026-09-22T13:32:19.000Z",
} as const satisfies WorldSkill
