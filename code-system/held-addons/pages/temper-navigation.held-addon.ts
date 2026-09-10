import type { HeldAddon } from "../held-addon.page-type.types.ts"

export const temperNavigation = {
  id: "01a081a2-4c1b-7876-acea-015c2fa8b043",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "temper-navigation",
  addonName: "TemperNavigation",
  esoAddon: "temper-navigation-addon",
  addonKind: "ported",
  heldBy: 15147,
  adjacents: [
    "temper-collections",
    "temper-keybinder",
    "lib-map-pins",
    "lib-addon-menu",
    "lib-gps",
    "lib-debug-logger",
    "lib-saved-vars",
    "lib-notification",
    "lib-treasure",
    "lib-map-data",
    "lib-async",
  ],
  tiClean: true,
} as const satisfies HeldAddon
