import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const libExtendedJournal = {
  id: "01a081a4-4c4e-7b50-9594-8fddefe9187d",
  type: "page-type/held-addon",
  slug: "lib-extended-journal",
  addonName: "LibExtendedJournal",
  esoAddon: "temper-addon/temper-lib-extended-journal",
  addonKind: "library",
  heldBy: 14479,
  adjacents: ["held-addon/temper-collections"],
  tiClean: true,
} as const satisfies HeldAddon
