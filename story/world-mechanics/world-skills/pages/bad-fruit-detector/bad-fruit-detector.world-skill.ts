import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const badFruitDetector = {
  id: "01a06575-97f2-74c1-b25b-3adc0309e873",
  type: "world-skill",
  slug: "bad-fruit-detector",
  title: "Bad Fruit Detector",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
