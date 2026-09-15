import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const libPrice = {
  id: "01a081a4-8901-728d-8d00-948d042a65a3",
  type: "page-type/held-addon",
  slug: "lib-price",
  addonName: "LibPrice",
  esoAddon: "eso-addon/temper-lib-price",
  addonKind: "library",
  heldBy: 13229,
  adjacents: ["held-addon/temper-crafting"],
  tiClean: true,
} as const satisfies HeldAddon
