import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const vehicleMagicalDelivery = {
  id: "01a0657d-0320-7844-ab2c-39311287302a",
  type: "world-skill",
  slug: "vehicle-magical-delivery",
  title: "Vehicle: Magical Delivery",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["vehicle-fast-travelling"],
  references: "jsonl",
} as const satisfies WorldSkill
