import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const libChatMessage = {
  id: "01a081a3-44a8-7c1f-b5b7-20501e303d9a",
  type: "page-type/held-addon",
  slug: "lib-chat-message",
  addonName: "LibChatMessage",
  esoAddon: "eso-addon/temper-lib-chat-message",
  addonKind: "library",
  heldBy: 13219,
  adjacents: ["held-addon/temper-crafting", "held-addon/lib-gps"],
  tiClean: true,
} as const satisfies HeldAddon
