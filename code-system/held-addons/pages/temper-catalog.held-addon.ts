import type { HeldAddon } from "../held-addon.page-type.ts"

export const temperCatalog = {
  id: "01a081a0-ef0c-7f9a-9f1c-82ed7871ec3d",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "temper-catalog",
  addonName: "TemperCatalog",
  esoAddon: "temper-catalog-addon",
  addonKind: "native",
  heldBy: 13034,
  adjacents: ["temper-characters", "temper-data-mining"],
  tiClean: true,
} as const satisfies HeldAddon
