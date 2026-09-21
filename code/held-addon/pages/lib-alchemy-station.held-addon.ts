import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const libAlchemyStation = {
  id: "01a081a2-f618-7839-b3f8-b192bcb8bbed",
  type: "page-type/held-addon",
  slug: "lib-alchemy-station",
  addonName: "LibAlchemyStation",
  temperAddon: "temper-addon/temper-lib-alchemy-station",
  addonKind: "library",
  heldBy: 13207,
  adjacents: ["held-addon/temper-crafting"],
  tiClean: true,
} as const satisfies HeldAddon
