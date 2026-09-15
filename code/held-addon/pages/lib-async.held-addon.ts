import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const libAsync = {
  id: "01a081a3-0fae-786d-8da5-4b22d99dad77",
  type: "page-type/held-addon",
  slug: "lib-async",
  addonName: "LibAsync",
  esoAddon: "eso-addon/temper-lib-async",
  addonKind: "library",
  heldBy: 13237,
  adjacents: ["held-addon/temper-crafting", "held-addon/temper-navigation"],
  tiClean: true,
} as const satisfies HeldAddon
