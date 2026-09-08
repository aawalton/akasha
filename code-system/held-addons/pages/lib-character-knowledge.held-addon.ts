import type { HeldAddon } from "../held-addon.page-type.ts"

export const libCharacterKnowledge = {
  id: "01a081a3-2a1e-74a3-ab33-591f9e3685af",
  pageTypeSlug: "held-addon",
  slug: "lib-character-knowledge",
  addonName: "LibCharacterKnowledge",
  esoAddonSlug: "temper-lib-character-knowledge",
  addonKind: "library",
  heldBy: 13239,
  adjacentSlugs: ["temper-crafting"],
  tiClean: true,
} as const satisfies HeldAddon
