import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const superSupportiveContractRefuser = {
  id: "01a0e9f0-a7e3-7edc-b254-79064b2ea29c",
  type: "page-type/world-title",
  slug: "super-supportive-contract-refuser",
  title: "Contract refuser",
  world: "world/super-supportive",
  aliases: ["refuser"],
  description:
    "Someone who never agreed to the Contract but has the powers anyway, usually still called Avowed.",
} as const satisfies WorldTitle
