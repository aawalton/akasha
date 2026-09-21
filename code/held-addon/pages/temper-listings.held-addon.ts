import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const temperListings = {
  id: "01a081a1-3011-72f6-89f4-926b6b886388",
  type: "page-type/held-addon",
  slug: "temper-listings",
  addonName: "TemperListings",
  esoAddon: "temper-addon/temper-addon-trading",
  addonKind: "native",
  heldBy: 13040,
  adjacents: ["held-addon/temper-inventory"],
  tiClean: true,
} as const satisfies HeldAddon
