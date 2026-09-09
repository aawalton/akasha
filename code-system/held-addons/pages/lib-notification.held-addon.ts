import type { HeldAddon } from "../held-addon.page-type.ts"

export const libNotification = {
  id: "01a081a4-6d91-7385-8091-4ff636e9d49e",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "lib-notification",
  addonName: "LibNotification",
  esoAddon: "temper-lib-notification",
  addonKind: "library",
  heldBy: 13224,
  adjacents: ["temper-navigation", "temper-collections"],
  tiCleanBlockedReason:
    "member-expr game-table append: providers.ts table.insert(notificationManager.providers, provider) writes game-owned NOTIFICATIONS/GAMEPAD_NOTIFICATIONS providers via a member-expression; .push lowers to the cached-temp form, not byte-equivalent to table.insert — source-zero and strict byte-equivalence mutually exclusive.",
} as const satisfies HeldAddon
