import type { HeldAddon } from "../held-addon.page-type.ts"

export const temperDataMining = {
  id: "01a081a1-0495-7275-b8bd-502748d70b97",
  pageTypeSlug: "held-addon",
  slug: "temper-data-mining",
  addonName: "TemperDataMining",
  esoAddonSlug: "temper-capture-datamining-addon",
  addonKind: "native",
  heldBy: 13035,
  adjacentSlugs: ["temper-catalog", "temper-inventory"],
  tiClean: true,
} as const satisfies HeldAddon
