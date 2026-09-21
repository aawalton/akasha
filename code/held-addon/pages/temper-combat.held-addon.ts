import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const temperCombat = {
  id: "01a081a1-8847-7950-947f-a7fcd9270819",
  type: "page-type/held-addon",
  slug: "temper-combat",
  addonName: "TemperCombat",
  temperAddon: "temper-addon/temper-addon-combat",
  addonKind: "ported",
  heldBy: 14328,
  adjacents: [
    "held-addon/lib-addon-menu",
    "held-addon/lib-custom-menu",
    "held-addon/lib-data-encode",
    "held-addon/lib-debug-logger",
  ],
} as const satisfies HeldAddon
