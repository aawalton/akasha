import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const libDataEncode = {
  id: "01a081a3-5f68-74ea-bea9-de228cd0c80d",
  type: "page-type/held-addon",
  slug: "lib-data-encode",
  addonName: "LibDataEncode",
  temperAddon: "temper-addon/temper-lib-data-encode",
  addonKind: "library",
  heldBy: 14340,
  adjacents: ["held-addon/temper-combat"],
  tiClean: true,
} as const satisfies HeldAddon
