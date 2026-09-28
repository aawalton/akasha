import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveWordchainBestowal = {
  id: "01a0e9f1-065f-74cc-8309-5e8e08e7949e",
  type: "page-type/world-mechanic",
  slug: "super-supportive-wordchain-bestowal",
  title: "Wordchain bestowal",
  world: "world/super-supportive",
  aliases: ["bestowed chain"],
  description:
    "A wordchain offered to someone else through the interface, which that person can accept or refuse.",
} as const satisfies WorldMechanic
