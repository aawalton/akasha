import type { HeldAddon } from "../held-addon.page-type.types.ts"

export const libExtendedJournal = {
  id: "01a081a4-4c4e-7b50-9594-8fddefe9187d",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "lib-extended-journal",
  addonName: "LibExtendedJournal",
  esoAddon: "temper-lib-extended-journal",
  addonKind: "library",
  heldBy: 14479,
  adjacents: ["temper-collections"],
  tiClean: true,
} as const satisfies HeldAddon
