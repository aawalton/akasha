import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const injurySense = {
  id: "01a06575-981e-7042-8adb-53b0cefbbabc",
  type: "world-skill",
  slug: "injury-sense",
  title: "Injury Sense",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
