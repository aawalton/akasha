import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereXiPresence = {
  id: "01a0ea8e-6697-715b-be4c-9944eb2281c4",
  type: "page-type/world-mechanic",
  slug: "otherwhere-xi-presence",
  title: "Presence",
  world: "world/the-calamitous-bob-stubbed",
  description: "The weight a strong soul presses on those around it.",
  aliases: ["Aura", "Intimidation"],
} as const satisfies WorldMechanic
