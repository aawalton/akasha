import type { HeldAddon } from "../held-addon.page-type.ts"

export const libShifterBox = {
  id: "01a081a4-fab1-7deb-909a-b47b041720df",
  pageTypeSlug: "held-addon",
  slug: "lib-shifter-box",
  addonName: "LibShifterBox",
  esoAddonSlug: "temper-lib-shifter-box",
  addonKind: "library",
  heldBy: 14477,
  adjacentSlugs: ["temper-interface"],
  tiClean: true,
} as const satisfies HeldAddon
