import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const libSavedVars = {
  id: "01a081a4-a572-785b-b132-9e17c759243c",
  type: "page-type/held-addon",
  slug: "lib-saved-vars",
  addonName: "LibSavedVars",
  esoAddon: "eso-addon/temper-lib-saved-vars",
  addonKind: "library",
  heldBy: 13238,
  adjacents: ["held-addon/temper-navigation", "held-addon/temper-collections"],
  tiClean: true,
} as const satisfies HeldAddon
