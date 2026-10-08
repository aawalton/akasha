import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const injurySense = {
  id: "01a06575-981e-7042-8adb-53b0cefbbabc",
  type: "page-type/world-skill",
  slug: "injury-sense",
  title: "Injury Sense",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.606Z",
  updatedAt: "2026-09-22T13:32:35.000Z",
} as const satisfies WorldSkill
