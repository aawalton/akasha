import type { HeldAddon } from "../held-addon.page-type.types.ts"

export const libAsync = {
  id: "01a081a3-0fae-786d-8da5-4b22d99dad77",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "lib-async",
  addonName: "LibAsync",
  esoAddon: "temper-lib-async",
  addonKind: "library",
  heldBy: 13237,
  adjacents: ["temper-crafting", "temper-navigation"],
  tiClean: true,
} as const satisfies HeldAddon
