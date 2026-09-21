import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const libCustomMenu = {
  id: "01a081a2-9161-757a-990c-c63b64bbb36d",
  type: "page-type/held-addon",
  slug: "lib-custom-menu",
  addonName: "LibCustomMenu",
  esoAddon: "temper-addon/temper-lib-custom-menu",
  addonKind: "library",
  heldBy: 13211,
  tiClean: true,
} as const satisfies HeldAddon
