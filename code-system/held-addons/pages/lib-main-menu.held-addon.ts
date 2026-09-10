import type { HeldAddon } from "../held-addon.page-type.types.ts"

export const libMainMenu = {
  id: "01a081a3-c598-7ed4-9dc9-489baee43af0",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "lib-main-menu",
  addonName: "LibMainMenu-2.0",
  esoAddon: "temper-lib-main-menu",
  addonKind: "library",
  heldBy: 13226,
  adjacents: ["temper-crafting"],
  tiClean: true,
} as const satisfies HeldAddon
