import type { HeldAddon } from "akasha/code/held-addons/held-addon.page-type.types.ts"

export const temperKeybinder = {
  id: "01a081a2-79f6-76bc-bfb3-a0b373f50177",
  type: "held-addon",
  slug: "temper-keybinder",
  addonName: "TemperKeybinder",
  esoAddon: "eso-addon/temper-keybinder-addon",
  addonKind: "ported",
  heldBy: 13122,
  adjacents: [
    "held-addon/temper-crafting",
    "held-addon/temper-navigation",
    "held-addon/lib-addon-keybinds",
  ],
  tiClean: true,
} as const satisfies HeldAddon
