import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVNotifications = {
  id: "01a0e9fc-f7ce-725d-80c2-326ca59efd43",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-notifications",
  title: "Notifications",
  world: "world/ends-of-magic",
  aliases: ["blue box", "box", "notification"],
  description: "A blue box of text in a person's sight.",
  createdAt: "2026-09-28T21:47:44.974Z",
  updatedAt: "2026-09-28T21:49:02.000Z",
} as const satisfies WorldMechanic
