import type { HeldAddon } from "../held-addon.page-type.ts"

export const libTreasure = {
  id: "01a081a5-51c5-7190-8dfb-d40463d5e218",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "lib-treasure",
  addonName: "LibTreasure",
  esoAddon: "temper-lib-treasure",
  addonKind: "library",
  heldBy: 13233,
  adjacents: ["temper-navigation", "temper-collections"],
  tiClean: true,
} as const satisfies HeldAddon
