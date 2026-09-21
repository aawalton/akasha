import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const libTreasure = {
  id: "01a081a5-51c5-7190-8dfb-d40463d5e218",
  type: "page-type/held-addon",
  slug: "lib-treasure",
  addonName: "LibTreasure",
  esoAddon: "temper-addon/temper-lib-treasure",
  addonKind: "library",
  heldBy: 13233,
  adjacents: ["held-addon/temper-navigation", "held-addon/temper-collections"],
  tiClean: true,
} as const satisfies HeldAddon
