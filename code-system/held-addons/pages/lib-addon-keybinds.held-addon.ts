import type { HeldAddon } from "../held-addon.page-type.ts"

export const libAddonKeybinds = {
  id: "01a081a2-a9d8-7192-a5f9-fc6facd57f99",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "lib-addon-keybinds",
  addonName: "libAddonKeybinds",
  esoAddon: "temper-lib-addon-keybinds",
  addonKind: "library",
  heldBy: 13231,
  adjacents: ["temper-keybinder"],
  tiClean: true,
} as const satisfies HeldAddon
