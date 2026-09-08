import type { HeldAddon } from "../held-addon.page-type.ts"

export const libChatMessage = {
  id: "01a081a3-44a8-7c1f-b5b7-20501e303d9a",
  pageTypeSlug: "held-addon",
  slug: "lib-chat-message",
  addonName: "LibChatMessage",
  esoAddonSlug: "temper-lib-chat-message",
  addonKind: "library",
  heldBy: 13219,
  adjacentSlugs: ["temper-crafting", "lib-gps"],
  tiClean: true,
} as const satisfies HeldAddon
