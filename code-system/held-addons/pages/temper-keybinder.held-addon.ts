import type { HeldAddon } from "../held-addon.page-type.ts"

export const temperKeybinder = {
  id: "01a081a2-79f6-76bc-bfb3-a0b373f50177",
  pageTypeSlug: "held-addon",
  slug: "temper-keybinder",
  addonName: "TemperKeybinder",
  esoAddonSlug: "temper-keybinder-addon",
  addonKind: "ported",
  heldBy: 13122,
  adjacentSlugs: ["temper-crafting", "temper-navigation", "lib-addon-keybinds"],
  tiClean: true,
} as const satisfies HeldAddon
