import type { HeldAddon } from "../held-addon.page-type.ts"

export const libZone = {
  id: "01a081a5-6ef3-75e4-b276-15a8136c5adf",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "lib-zone",
  addonName: "LibZone",
  esoAddon: "temper-lib-zone",
  addonKind: "library",
  heldBy: 14340,
  adjacents: ["lib-sets"],
  tiClean: true,
} as const satisfies HeldAddon
