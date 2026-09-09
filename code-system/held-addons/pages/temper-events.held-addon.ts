import type { HeldAddon } from "../held-addon.page-type.ts"

export const temperEvents = {
  id: "01a081a2-1a3e-7e82-b4fc-00134573d02d",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "temper-events",
  addonName: "TemperEvents",
  esoAddon: "temper-events-addon",
  addonKind: "ported",
  heldBy: 15144,
  adjacents: ["lib-addon-menu"],
  tiClean: true,
} as const satisfies HeldAddon
