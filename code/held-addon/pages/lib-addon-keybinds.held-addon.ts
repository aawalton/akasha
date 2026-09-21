import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const libAddonKeybinds = {
  id: "01a081a2-a9d8-7192-a5f9-fc6facd57f99",
  type: "page-type/held-addon",
  slug: "lib-addon-keybinds",
  addonName: "libAddonKeybinds",
  esoAddon: "temper-addon/temper-lib-addon-keybinds",
  addonKind: "library",
  heldBy: 13231,
  adjacents: ["held-addon/temper-keybinder"],
  tiClean: true,
} as const satisfies HeldAddon
