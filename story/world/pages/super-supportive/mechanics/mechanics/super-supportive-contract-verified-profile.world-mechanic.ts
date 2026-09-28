import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveContractVerifiedProfile = {
  id: "01a0e9f2-9a51-7631-b98d-e84636e5a02c",
  type: "page-type/world-mechanic",
  slug: "super-supportive-contract-verified-profile",
  title: "Contract Verified Information",
  world: "world/super-supportive",
  aliases: ["Avowed profile", "Share Contract Verified Information"],
  description: "An Avowed's official profile of rank, level, skills, spells and stats.",
} as const satisfies WorldMechanic
