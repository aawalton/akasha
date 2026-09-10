import type { HeldAddon } from "../held-addon.page-type.types.ts"

export const temperInventory = {
  id: "01a081a1-1b24-7205-81ba-f60c530a5e31",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "temper-inventory",
  addonName: "TemperInventory",
  esoAddon: "temper-items-addon",
  addonKind: "native",
  heldBy: 13037,
  adjacents: ["temper-data-mining", "temper-listings", "temper-hud"],
  tiClean: true,
} as const satisfies HeldAddon
