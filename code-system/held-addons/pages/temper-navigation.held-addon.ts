import type { HeldAddon } from "../held-addon.page-type.ts"

export const temperNavigation = {
  id: "01a081a2-4c1b-7876-acea-015c2fa8b043",
  pageTypeSlug: "held-addon",
  slug: "temper-navigation",
  addonName: "TemperNavigation",
  esoAddonSlug: "temper-navigation-addon",
  addonKind: "ported",
  heldBy: 15147,
  adjacentSlugs: [
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
