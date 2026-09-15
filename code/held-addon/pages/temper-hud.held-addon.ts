import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const temperHud = {
  id: "01a081a1-453c-7b1d-b913-d260d874eae6",
  type: "page-type/held-addon",
  slug: "temper-hud",
  addonName: "TemperHud",
  esoAddon: "eso-addon/temper-hud-addon",
  addonKind: "native",
  heldBy: 13085,
  adjacents: ["held-addon/temper-inventory", "held-addon/temper-interface"],
  tiClean: true,
} as const satisfies HeldAddon
