import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveRegistration = {
  id: "01a0e9f0-3dfb-76e1-b9b2-6a93eced59a3",
  type: "page-type/world-mechanic",
  slug: "super-supportive-registration",
  title: "Registration",
  world: "world/super-supportive",
  aliases: ["registering"],
  description: "A new Avowed's legal declaration of their powers.",
} as const satisfies WorldMechanic
