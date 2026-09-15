import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const libSets = {
  id: "01a081a4-dd4b-7c5c-8b05-e087fc85b3c7",
  type: "held-addon",
  slug: "lib-sets",
  addonName: "LibSets",
  esoAddon: "eso-addon/temper-lib-sets",
  addonKind: "library",
  heldBy: 13244,
  adjacents: ["held-addon/temper-crafting"],
  tiClean: true,
} as const satisfies HeldAddon
