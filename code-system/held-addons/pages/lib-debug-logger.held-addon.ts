import type { HeldAddon } from "../held-addon.page-type.ts"

export const libDebugLogger = {
  id: "01a081a3-78ce-730a-9423-cfbb2836b234",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "lib-debug-logger",
  addonName: "LibDebugLogger",
  esoAddon: "temper-lib-debug-logger",
  addonKind: "library",
  heldBy: 13215,
  adjacents: ["temper-navigation", "temper-collections", "temper-crafting", "lib-addon-menu"],
  tiClean: true,
} as const satisfies HeldAddon
