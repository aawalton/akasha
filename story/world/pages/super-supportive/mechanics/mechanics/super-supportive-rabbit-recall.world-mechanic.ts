import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveRabbitRecall = {
  id: "01a0e9fb-2b66-714c-9122-c2bd2959e152",
  type: "page-type/world-mechanic",
  slug: "super-supportive-rabbit-recall",
  title: "Rabbit Recall",
  world: "world/super-supportive",
  description:
    "A Meister recalling a weapon that a Rabbit holds preserved, so the Rabbit is pulled bodily to the Meister.",
} as const satisfies WorldMechanic
