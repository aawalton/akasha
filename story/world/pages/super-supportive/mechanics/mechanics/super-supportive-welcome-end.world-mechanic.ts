import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveWelcomeEnd = {
  id: "01a0e9f9-7733-789e-b16d-28485b9d233f",
  type: "page-type/world-mechanic",
  slug: "super-supportive-welcome-end",
  title: "Welcome End",
  world: "world/super-supportive",
  description:
    "A seasonal celebration where knights acknowledge the Declared who will soon join them.",
} as const satisfies WorldMechanic
