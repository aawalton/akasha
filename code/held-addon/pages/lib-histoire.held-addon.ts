import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const libHistoire = {
  id: "01a081a3-ab54-7f37-b355-2b890f148f28",
  type: "page-type/held-addon",
  slug: "lib-histoire",
  addonName: "LibHistoire",
  temperAddon: "temper-addon/temper-lib-histoire",
  addonKind: "library",
  heldBy: 13242,
  tiClean: true,
} as const satisfies HeldAddon
