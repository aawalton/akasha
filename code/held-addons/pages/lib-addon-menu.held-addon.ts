import type { HeldAddon } from "akasha/code/held-addons/held-addon.page-type.types.ts"

export const libAddonMenu = {
  id: "01a081a2-dde3-7a10-b133-4888e090e188",
  type: "held-addon",
  slug: "lib-addon-menu",
  addonName: "LibAddonMenu-2.0",
  esoAddon: "eso-addon/temper-lib-addon-menu",
  addonKind: "library",
  heldBy: 13212,
  adjacents: [
    "held-addon/temper-crafting",
    "held-addon/temper-navigation",
    "held-addon/temper-collections",
    "held-addon/temper-events",
    "held-addon/lib-alchemy-station",
  ],
  tiClean: true,
} as const satisfies HeldAddon
