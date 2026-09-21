import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const libMainMenu = {
  id: "01a081a3-c598-7ed4-9dc9-489baee43af0",
  type: "page-type/held-addon",
  slug: "lib-main-menu",
  addonName: "LibMainMenu-2.0",
  temperAddon: "temper-addon/temper-lib-main-menu",
  addonKind: "library",
  heldBy: 13226,
  adjacents: ["held-addon/temper-crafting"],
  tiClean: true,
} as const satisfies HeldAddon
