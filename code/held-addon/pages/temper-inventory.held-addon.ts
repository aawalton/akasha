import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const temperInventory = {
  id: "01a081a1-1b24-7205-81ba-f60c530a5e31",
  type: "page-type/held-addon",
  slug: "temper-inventory",
  addonName: "TemperInventory",
  esoAddon: "eso-addon/temper-items-addon",
  addonKind: "native",
  heldBy: 13037,
  adjacents: [
    "held-addon/temper-data-mining",
    "held-addon/temper-listings",
    "held-addon/temper-hud",
  ],
  tiClean: true,
} as const satisfies HeldAddon
