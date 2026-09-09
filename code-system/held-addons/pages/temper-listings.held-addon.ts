import type { HeldAddon } from "../held-addon.page-type.ts"

export const temperListings = {
  id: "01a081a1-3011-72f6-89f4-926b6b886388",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "temper-listings",
  addonName: "TemperListings",
  esoAddon: "temper-trading-addon",
  addonKind: "native",
  heldBy: 13040,
  adjacents: ["temper-inventory"],
  tiClean: true,
} as const satisfies HeldAddon
