import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveInvitation = {
  id: "01a0e9f9-1fa2-7c04-ad9e-2d6b1dcdce28",
  type: "page-type/world-mechanic",
  slug: "super-supportive-invitation",
  title: "Invitation",
  world: "world/super-supportive",
  aliases: ["teleport invitation"],
  description: "A System teleport offer to visit someone, with no timer and no payment.",
} as const satisfies WorldMechanic
