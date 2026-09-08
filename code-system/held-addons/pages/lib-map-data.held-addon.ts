import type { HeldAddon } from "../held-addon.page-type.ts"

export const libMapData = {
  id: "01a081a3-df62-7bc3-bbc6-7bed199ce20d",
  pageTypeSlug: "held-addon",
  slug: "lib-map-data",
  addonName: "LibMapData",
  esoAddonSlug: "temper-lib-map-data",
  addonKind: "library",
  heldBy: 13234,
  adjacentSlugs: ["temper-navigation", "temper-collections"],
  tiClean: true,
} as const satisfies HeldAddon
