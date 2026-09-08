import type { HeldAddon } from "../held-addon.page-type.ts"

export const temperInventory = {
  id: "01a081a1-1b24-7205-81ba-f60c530a5e31",
  pageTypeSlug: "held-addon",
  slug: "temper-inventory",
  addonName: "TemperInventory",
  esoAddonSlug: "temper-items-addon",
  addonKind: "native",
  heldBy: 13037,
  adjacentSlugs: ["temper-data-mining", "temper-listings", "temper-hud"],
  tiClean: true,
} as const satisfies HeldAddon
