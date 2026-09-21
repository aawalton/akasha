import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const temperNavigation = {
  id: "01a081a2-4c1b-7876-acea-015c2fa8b043",
  type: "page-type/held-addon",
  slug: "temper-navigation",
  addonName: "TemperNavigation",
  esoAddon: "temper-addon/temper-navigation-addon",
  addonKind: "ported",
  heldBy: 15147,
  adjacents: [
    "held-addon/temper-collections",
    "held-addon/temper-keybinder",
    "held-addon/lib-map-pins",
    "held-addon/lib-addon-menu",
    "held-addon/lib-gps",
    "held-addon/lib-debug-logger",
    "held-addon/lib-saved-vars",
    "held-addon/lib-notification",
    "held-addon/lib-treasure",
    "held-addon/lib-map-data",
    "held-addon/lib-async",
  ],
  tiClean: true,
} as const satisfies HeldAddon
