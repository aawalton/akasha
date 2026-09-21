import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const temperErrors = {
  id: "01a081a1-5bd1-7fbc-b50c-72f33d154c04",
  type: "page-type/held-addon",
  slug: "temper-errors",
  addonName: "TemperErrors",
  esoAddon: "temper-addon/temper-addon-errors",
  addonKind: "native",
  heldBy: 13133,
  tiClean: true,
} as const satisfies HeldAddon
