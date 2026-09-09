import type { HeldAddon } from "../held-addon.page-type.ts"

export const temperCombat = {
  id: "01a081a1-8847-7950-947f-a7fcd9270819",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "temper-combat",
  addonName: "TemperCombat",
  esoAddon: "temper-combat-addon",
  addonKind: "ported",
  heldBy: 14328,
  adjacents: ["lib-addon-menu", "lib-custom-menu", "lib-data-encode", "lib-debug-logger"],
} as const satisfies HeldAddon
