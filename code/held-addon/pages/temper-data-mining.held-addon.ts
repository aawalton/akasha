import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const temperDataMining = {
  id: "01a081a1-0495-7275-b8bd-502748d70b97",
  type: "held-addon",
  slug: "temper-data-mining",
  addonName: "TemperDataMining",
  esoAddon: "eso-addon/temper-capture-datamining-addon",
  addonKind: "native",
  heldBy: 13035,
  adjacents: ["held-addon/temper-catalog", "held-addon/temper-inventory"],
  tiClean: true,
} as const satisfies HeldAddon
