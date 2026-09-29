import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereXiManaPoisoning = {
  id: "01a0ea7c-4d19-7be6-a18a-3d95cd4033ea",
  type: "page-type/world-mechanic",
  slug: "otherwhere-xi-mana-poisoning",
  title: "Mana Poisoning",
  world: "world/the-calamitous-bob-stubbed",
  description: "Sickness from foreign or excess mana in the body.",
  aliases: ["Mana overload"],
} as const satisfies WorldMechanic
