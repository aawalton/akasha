import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVNotifications = {
  id: "01a0e9fc-f7ce-725d-80c2-326ca59efd43",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-notifications",
  title: "Notifications",
  world: "world/ends-of-magic",
  aliases: ["blue box", "box", "notification"],
  description: "A blue box of text Davrar shows in a person's sight.",
} as const satisfies WorldMechanic
