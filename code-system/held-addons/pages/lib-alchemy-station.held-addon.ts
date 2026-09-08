import type { HeldAddon } from "../held-addon.page-type.ts"

export const libAlchemyStation = {
  id: "01a081a2-f618-7839-b3f8-b192bcb8bbed",
  pageTypeSlug: "held-addon",
  slug: "lib-alchemy-station",
  addonName: "LibAlchemyStation",
  esoAddonSlug: "temper-lib-alchemy-station",
  addonKind: "library",
  heldBy: 13207,
  adjacentSlugs: ["temper-crafting"],
  tiClean: true,
} as const satisfies HeldAddon
