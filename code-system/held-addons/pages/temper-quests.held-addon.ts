import type { HeldAddon } from "../held-addon.page-type.ts"

export const temperQuests = {
  id: "01a081a0-daff-79b9-b5a7-f80376a26718",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "temper-quests",
  addonName: "TemperQuests",
  esoAddon: "temper-quests-addon",
  addonKind: "native",
  heldBy: 15656,
  adjacents: ["temper-characters"],
  tiClean: true,
} as const satisfies HeldAddon
