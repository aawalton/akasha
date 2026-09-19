import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const orderOfTheSamaritan = {
  id: "01a0657d-027c-7b1b-ad2c-4ca78322d73c",
  type: "page-type/world-skill",
  slug: "order-of-the-samaritan",
  title: "Order of the Samaritan",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
