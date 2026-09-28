import type { WorldLegacy } from "akasha/story/world/mechanics/legacies/world-legacy.page-type.types.ts"

export const superSupportiveGorgonsGift = {
  id: "01a0e9f0-79f4-7ead-bb08-286bbd9c68f9",
  type: "page-type/world-legacy",
  slug: "super-supportive-gorgons-gift",
  title: "Gorgon's gift",
  world: "world/super-supportive",
  aliases: ["the gremlin", "the gift", "the presence"],
  description:
    "A presence inside a person's mind that insists on balance and restricts what they may eat.",
} as const satisfies WorldLegacy
