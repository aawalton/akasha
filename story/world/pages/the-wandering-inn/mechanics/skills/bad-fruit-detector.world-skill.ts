import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const badFruitDetector = {
  id: "01a06575-97f2-74c1-b25b-3adc0309e873",
  type: "page-type/world-skill",
  slug: "bad-fruit-detector",
  title: "Bad Fruit Detector",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.562Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
