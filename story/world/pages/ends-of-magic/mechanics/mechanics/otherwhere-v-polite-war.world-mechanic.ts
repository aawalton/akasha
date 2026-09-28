import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVPoliteWar = {
  id: "01a0e9fe-b556-7ad4-b69c-7c4b12851eeb",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-polite-war",
  title: "Polite War",
  world: "world/ends-of-magic",
  aliases: ["Polite Wars", "formal Questor conflict", "Questor war"],
  description: "A formal war between Questors under agreed terms.",
} as const satisfies WorldMechanic
