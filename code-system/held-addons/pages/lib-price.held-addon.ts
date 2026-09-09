import type { HeldAddon } from "../held-addon.page-type.ts"

export const libPrice = {
  id: "01a081a4-8901-728d-8d00-948d042a65a3",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "lib-price",
  addonName: "LibPrice",
  esoAddon: "temper-lib-price",
  addonKind: "library",
  heldBy: 13229,
  adjacents: ["temper-crafting"],
  tiClean: true,
} as const satisfies HeldAddon
