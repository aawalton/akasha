import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const libDebugLogger = {
  id: "01a081a3-78ce-730a-9423-cfbb2836b234",
  type: "page-type/held-addon",
  slug: "lib-debug-logger",
  addonName: "LibDebugLogger",
  esoAddon: "temper-addon/temper-lib-debug-logger",
  addonKind: "library",
  heldBy: 13215,
  adjacents: [
    "held-addon/temper-navigation",
    "held-addon/temper-collections",
    "held-addon/temper-crafting",
    "held-addon/lib-addon-menu",
  ],
  tiClean: true,
} as const satisfies HeldAddon
