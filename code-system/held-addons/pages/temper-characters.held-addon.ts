import type { HeldAddon } from "../held-addon.page-type.ts"

export const temperCharacters = {
  id: "01a081a0-c656-7b98-93c9-da4d56019d8f",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "temper-characters",
  addonName: "TemperCharacters",
  esoAddon: "temper-characters-addon",
  addonKind: "native",
  heldBy: 13029,
  adjacents: ["temper-companions", "temper-catalog", "temper-quests"],
  tiClean: true,
} as const satisfies HeldAddon
