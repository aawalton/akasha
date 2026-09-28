import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveMarriageContract = {
  id: "01a0e9fb-2b66-7e23-9320-b443b25c4d0d",
  type: "page-type/world-mechanic",
  slug: "super-supportive-marriage-contract",
  title: "Marriage contract",
  world: "world/super-supportive",
  aliases: ["relationship contract"],
  description: "An Artonan magical contract of marriage, whose terms vary greatly.",
} as const satisfies WorldMechanic
