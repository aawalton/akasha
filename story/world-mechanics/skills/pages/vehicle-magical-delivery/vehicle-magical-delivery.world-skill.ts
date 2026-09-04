import type { WorldSkill } from "../../world-skill.page-type.ts"

export const vehicleMagicalDelivery = {
  id: "01a0657d-0320-7844-ab2c-39311287302a",
  pageTypeSlug: "world-skill",
  slug: "vehicle-magical-delivery",
  title: "Vehicle: Magical Delivery",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["vehicle-fast-travelling"],
  references: "jsonl",
} as const satisfies WorldSkill
