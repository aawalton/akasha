import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVVerification = {
  id: "01a0e9fc-f7ce-7c6d-823b-74ce71f176fc",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-verification",
  title: "Verification",
  world: "world/ends-of-magic",
  aliases: ["verified truth", "Davrar's truth", "validation"],
  description: "Davrar's confirmation that a claim is true.",
} as const satisfies WorldMechanic
