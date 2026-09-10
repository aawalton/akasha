import type { HeldAddon } from "../held-addon.page-type.types.ts"

export const temperInterface = {
  id: "01a081a1-dfaa-7a8a-bceb-a6e01d594896",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "temper-interface",
  addonName: "TemperInterface",
  esoAddon: "temper-interface-addon",
  addonKind: "ported",
  heldBy: 15148,
  adjacents: ["temper-hud", "lib-addon-menu-order-list-box", "lib-shifter-box"],
  tiCleanBlockedReason:
    "no-thank-you/hooks/notifications.ts:416,453 write LibNotifications' provider.notifications (member-expression, foreign-owned) — the game-owned ∩ member-expression cell; source-zero and compiled-Lua byte-equivalence are mutually exclusive, same pole as LibNotification #13224. All 12 other table.* sites converted (#14339).",
} as const satisfies HeldAddon
