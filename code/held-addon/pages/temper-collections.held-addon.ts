import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const temperCollections = {
  id: "01a081a1-c34d-7655-8254-5485c25371c5",
  type: "page-type/held-addon",
  slug: "temper-collections",
  addonName: "TemperCollections",
  temperAddon: "temper-addon/temper-addon-collections",
  addonKind: "ported",
  heldBy: 15143,
  adjacents: [
    "held-addon/temper-navigation",
    "held-addon/lib-map-pins",
    "held-addon/lib-extended-journal",
    "held-addon/lib-saved-vars",
    "held-addon/lib-treasure",
    "held-addon/lib-notification",
  ],
  tiCleanBlockedReason:
    "member-expr game-owned table.remove: losttreasure/notifications.ts removeNotification does table.remove(provider.notifications, id) where provider is a LibNotification-owned CreateProvider() read back in UpdateNotifications — game-owned member-expression, where .splice lowers to the cached-temp/__TS__ArraySplice form, not byte-equivalent to the raw call; source-zero and strict byte-equivalence mutually exclusive. All 14 other raw table.* sites converted (#14330 bite 2, byte-equivalence proven: game-owned scrollData appends lowered to the clean scrollData[#scrollData+1]=v idiom).",
} as const satisfies HeldAddon
