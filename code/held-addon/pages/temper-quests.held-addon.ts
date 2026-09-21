import type { HeldAddon } from "akasha/code/held-addon/held-addon.page-type.types.ts"

export const temperQuests = {
  id: "01a081a0-daff-79b9-b5a7-f80376a26718",
  type: "page-type/held-addon",
  slug: "temper-quests",
  addonName: "TemperQuests",
  esoAddon: "temper-addon/temper-addon-quests",
  addonKind: "native",
  heldBy: 15656,
  adjacents: ["held-addon/temper-characters"],
  tiClean: true,
} as const satisfies HeldAddon
