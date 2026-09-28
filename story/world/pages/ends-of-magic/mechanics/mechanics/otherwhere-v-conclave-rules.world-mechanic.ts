import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVConclaveRules = {
  id: "01a0e9fb-f2e3-7714-9d1c-ea2aa6d1b74f",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-conclave-rules",
  title: "Conclave Rules",
  world: "world/ends-of-magic",
  aliases: ["Conclave", "Questor Conclave"],
  description: "The procedure by which a gathering of Questors votes to change Davrar's rules.",
} as const satisfies WorldMechanic
