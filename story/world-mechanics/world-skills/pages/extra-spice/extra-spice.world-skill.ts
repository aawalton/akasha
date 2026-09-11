import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const extraSpice = {
  id: "01a06575-980a-7668-b1d2-8567ce70315a",
  type: "world-skill",
  slug: "extra-spice",
  title: "Extra Spice",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
