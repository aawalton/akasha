import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const libMapData = {
  id: "01a081a3-df62-7bc3-bbc6-7bed199ce20d",
  type: "page-type/held-addon",
  slug: "lib-map-data",
  addonName: "LibMapData",
  esoAddon: "temper-addon/temper-lib-map-data",
  addonKind: "library",
  heldBy: 13234,
  adjacents: ["held-addon/temper-navigation", "held-addon/temper-collections"],
  tiClean: true,
} as const satisfies HeldAddon
