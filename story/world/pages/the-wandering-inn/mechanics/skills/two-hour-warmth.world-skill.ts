import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const twoHourWarmth = {
  id: "01a0657d-0317-798f-981d-839bb59100cf",
  type: "page-type/world-skill",
  slug: "two-hour-warmth",
  title: "Two Hour Warmth",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
