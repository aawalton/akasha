import type { HeldAddon } from "../held-addon.page-type.ts"

export const temperCompanions = {
  id: "01a081a0-b067-71a4-aa1c-3509bc37c485",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "temper-companions",
  addonName: "TemperCompanions",
  esoAddon: "temper-companions-addon",
  addonKind: "native",
  heldBy: 13024,
  adjacents: ["temper-characters"],
  tiClean: true,
} as const satisfies HeldAddon
