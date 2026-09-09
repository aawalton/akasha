import type { HeldAddon } from "../held-addon.page-type.ts"

export const libSets = {
  id: "01a081a4-dd4b-7c5c-8b05-e087fc85b3c7",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "lib-sets",
  addonName: "LibSets",
  esoAddon: "temper-lib-sets",
  addonKind: "library",
  heldBy: 13244,
  adjacents: ["temper-crafting"],
  tiClean: true,
} as const satisfies HeldAddon
