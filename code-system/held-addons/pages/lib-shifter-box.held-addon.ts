import type { HeldAddon } from "../held-addon.page-type.ts"

export const libShifterBox = {
  id: "01a081a4-fab1-7deb-909a-b47b041720df",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "lib-shifter-box",
  addonName: "LibShifterBox",
  esoAddon: "temper-lib-shifter-box",
  addonKind: "library",
  heldBy: 14477,
  adjacents: ["temper-interface"],
  tiClean: true,
} as const satisfies HeldAddon
