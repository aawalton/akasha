import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const waterloggedCrops = {
  id: "01a0657d-032c-7121-9edc-a51134208190",
  type: "world-skill",
  slug: "waterlogged-crops",
  title: "Waterlogged Crops",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
