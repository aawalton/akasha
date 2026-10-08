import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const vehicleMagicalDelivery = {
  id: "01a0657d-0320-7844-ab2c-39311287302a",
  type: "page-type/world-skill",
  slug: "vehicle-magical-delivery",
  title: "Vehicle: Magical Delivery",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-skill/vehicle-fast-travelling"],
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.752Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldSkill
