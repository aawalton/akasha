import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const libShifterBox = {
  id: "01a081a4-fab1-7deb-909a-b47b041720df",
  type: "held-addon",
  slug: "lib-shifter-box",
  addonName: "LibShifterBox",
  esoAddon: "eso-addon/temper-lib-shifter-box",
  addonKind: "library",
  heldBy: 14477,
  adjacents: ["held-addon/temper-interface"],
  tiClean: true,
} as const satisfies HeldAddon
