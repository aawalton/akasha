import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveGuestRight = {
  id: "01a0e9f9-1fa2-7c5e-b6eb-74c8bd79b203",
  type: "page-type/world-mechanic",
  slug: "super-supportive-guest-right",
  title: "guest right",
  world: "world/super-supportive",
  description: "An Artonan household's recognition of someone as its guest.",
} as const satisfies WorldMechanic
