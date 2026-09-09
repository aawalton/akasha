import type { HeldAddon } from "../held-addon.page-type.ts"

export const libGps = {
  id: "01a081a3-9240-717f-9060-1239ce292038",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "lib-gps",
  addonName: "LibGPS",
  esoAddon: "temper-lib-gps",
  addonKind: "library",
  heldBy: 13216,
  adjacents: ["temper-navigation", "temper-collections"],
  tiClean: true,
} as const satisfies HeldAddon
