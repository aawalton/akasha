import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveAdjuster = {
  id: "01a0e9f1-6aa9-70ca-bcaf-c5c5901e04d2",
  type: "page-type/world-class",
  slug: "super-supportive-adjuster",
  title: "Adjuster",
  world: "world/super-supportive",
  aliases: ["Adjuster of Reality"],
  description:
    "A spell-heavy, build-your-own mage class with a large starting list of reality-altering spells.",
} as const satisfies WorldClass
