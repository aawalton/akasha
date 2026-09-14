import type { HeldAddon } from "akasha/code/held-addons/held-addon.page-type.types.ts"

export const libMapPins = {
  id: "01a081a4-156f-7987-b7f7-d3f571fc27df",
  type: "held-addon",
  slug: "lib-map-pins",
  addonName: "LibMapPins-1.0",
  esoAddon: "temper-lib-map-pins",
  addonKind: "library",
  heldBy: 13198,
  adjacents: ["held-addon/temper-navigation", "held-addon/temper-collections"],
  tiClean: true,
} as const satisfies HeldAddon
