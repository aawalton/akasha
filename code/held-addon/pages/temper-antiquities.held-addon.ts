import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const temperAntiquities = {
  id: "01a081a2-317b-7b71-9563-83eb02858b27",
  type: "held-addon",
  slug: "temper-antiquities",
  addonName: "TemperAntiquities",
  esoAddon: "eso-addon/temper-antiquities-addon",
  addonKind: "ported",
  heldBy: 15145,
  tiClean: true,
} as const satisfies HeldAddon
