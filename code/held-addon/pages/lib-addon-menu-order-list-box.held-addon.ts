import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const libAddonMenuOrderListBox = {
  id: "01a081a2-c451-788f-b202-460a68cea4eb",
  type: "page-type/held-addon",
  slug: "lib-addon-menu-order-list-box",
  addonName: "LibAddonMenuOrderListBox",
  esoAddon: "eso-addon/temper-lib-addon-menu-order-list-box",
  addonKind: "library",
  heldBy: 14477,
  adjacents: ["held-addon/temper-interface"],
  tiClean: true,
} as const satisfies HeldAddon
