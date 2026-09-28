import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const superSupportiveAuthorizedWitness = {
  id: "01a0e9f0-a7e3-7787-8c73-6c95ec63b027",
  type: "page-type/world-title",
  slug: "super-supportive-authorized-witness",
  title: "Authorized witness",
  world: "world/super-supportive",
  aliases: ["approved witness", "Authorized Witness privilege"],
  description:
    "A person the System approves to vouch for selectees in class trades, for certain System actions and for legal contracts.",
} as const satisfies WorldTitle
