import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const pestlessCrops = {
  id: "01a0657d-028f-7481-805e-e1358159fe0e",
  type: "world-skill",
  slug: "pestless-crops",
  title: "Pestless Crops",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
