import type { HeldAddon } from "../held-addon.page-type.ts"

export const temperCrafting = {
  id: "01a081a1-a1ee-72cd-afed-1ad2e46b136f",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "temper-crafting",
  addonName: "TemperCrafting",
  esoAddon: "temper-crafting-addon",
  addonKind: "ported",
  heldBy: 14506,
  adjacents: [
    "temper-characters",
    "lib-character-knowledge",
    "temper-keybinder",
    "lib-addon-menu",
    "lib-alchemy-station",
    "lib-async",
    "lib-custom-menu",
    "lib-main-menu",
    "lib-price",
    "lib-sets",
  ],
  tiClean: true,
} as const satisfies HeldAddon
