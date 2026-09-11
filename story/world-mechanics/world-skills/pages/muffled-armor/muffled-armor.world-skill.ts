import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const muffledArmor = {
  id: "01a0657d-0270-7dc0-baae-6ba84e11b8c8",
  type: "world-skill",
  slug: "muffled-armor",
  title: "Muffled Armor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
