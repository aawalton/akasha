import type { HeldAddon } from "akasha/code/held-addons/held-addon.page-type.types.ts"

export const libMapPing = {
  id: "01a081a3-fa3e-7dd8-8c4e-d7e270a746c7",
  type: "held-addon",
  slug: "lib-map-ping",
  addonName: "LibMapPing",
  esoAddon: "temper-lib-map-ping",
  addonKind: "library",
  heldBy: 13227,
  adjacents: ["lib-gps"],
  tiClean: true,
} as const satisfies HeldAddon
