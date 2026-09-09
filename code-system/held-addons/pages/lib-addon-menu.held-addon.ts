import type { HeldAddon } from "../held-addon.page-type.ts"

export const libAddonMenu = {
  id: "01a081a2-dde3-7a10-b133-4888e090e188",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "lib-addon-menu",
  addonName: "LibAddonMenu-2.0",
  esoAddon: "temper-lib-addon-menu",
  addonKind: "library",
  heldBy: 13212,
  adjacents: [
    "temper-crafting",
    "temper-navigation",
    "temper-collections",
    "temper-events",
    "lib-alchemy-station",
  ],
  tiClean: true,
} as const satisfies HeldAddon
