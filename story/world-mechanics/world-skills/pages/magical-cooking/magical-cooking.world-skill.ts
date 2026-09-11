import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const magicalCooking = {
  id: "01a0657d-0242-77bf-993b-aeecce142d27",
  type: "world-skill",
  slug: "magical-cooking",
  title: "Magical Cooking",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
