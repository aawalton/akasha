import type { HeldAddon } from "../held-addon.page-type.types.ts"

export const temperAddons = {
  id: "01a081a1-7197-76bd-a9a3-bb6f948f63f7",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "temper-addons",
  addonName: "TemperAddons",
  esoAddon: "temper-selector-addon",
  addonKind: "native",
  heldBy: 13141,
  tiClean: true,
} as const satisfies HeldAddon
