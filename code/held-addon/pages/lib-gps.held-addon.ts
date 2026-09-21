import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const libGps = {
  id: "01a081a3-9240-717f-9060-1239ce292038",
  type: "page-type/held-addon",
  slug: "lib-gps",
  addonName: "LibGPS",
  esoAddon: "temper-addon/temper-lib-gps",
  addonKind: "library",
  heldBy: 13216,
  adjacents: ["held-addon/temper-navigation", "held-addon/temper-collections"],
  tiClean: true,
} as const satisfies HeldAddon
