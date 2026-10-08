import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveRegistration = {
  id: "01a0e9f0-3dfb-76e1-b9b2-6a93eced59a3",
  type: "page-type/world-mechanic",
  slug: "super-supportive-registration",
  title: "Registration",
  world: "world/super-supportive",
  aliases: ["registering"],
  description: "A new Avowed's legal declaration of their powers.",
  createdAt: "2026-09-28T21:33:50.971Z",
  updatedAt: "2026-09-28T21:33:54.000Z",
} as const satisfies WorldMechanic
