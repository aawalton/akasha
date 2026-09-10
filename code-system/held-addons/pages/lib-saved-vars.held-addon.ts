import type { HeldAddon } from "../held-addon.page-type.types.ts"

export const libSavedVars = {
  id: "01a081a4-a572-785b-b132-9e17c759243c",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "lib-saved-vars",
  addonName: "LibSavedVars",
  esoAddon: "temper-lib-saved-vars",
  addonKind: "library",
  heldBy: 13238,
  adjacents: ["temper-navigation", "temper-collections"],
  tiClean: true,
} as const satisfies HeldAddon
