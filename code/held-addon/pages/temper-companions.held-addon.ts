import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const temperCompanions = {
  id: "01a081a0-b067-71a4-aa1c-3509bc37c485",
  type: "page-type/held-addon",
  slug: "temper-companions",
  addonName: "TemperCompanions",
  temperAddon: "temper-addon/temper-addon-companions",
  addonKind: "native",
  heldBy: 13024,
  adjacents: ["held-addon/temper-characters"],
  tiClean: true,
} as const satisfies HeldAddon
