import type { HeldAddon } from "../held-addon.page-type.types.ts"

export const libChatMessage = {
  id: "01a081a3-44a8-7c1f-b5b7-20501e303d9a",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "lib-chat-message",
  addonName: "LibChatMessage",
  esoAddon: "temper-lib-chat-message",
  addonKind: "library",
  heldBy: 13219,
  adjacents: ["temper-crafting", "lib-gps"],
  tiClean: true,
} as const satisfies HeldAddon
