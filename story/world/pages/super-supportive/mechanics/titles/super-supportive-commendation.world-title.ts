import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const superSupportiveCommendation = {
  id: "01a0e9f0-a7e3-7c15-8085-a4572c1487a7",
  type: "page-type/world-title",
  slug: "super-supportive-commendation",
  title: "Exceptional Bravery in the Absence of Obligation",
  world: "world/super-supportive",
  aliases: ["commendation", "star"],
  description: "A commendation shown as a star next to an Avowed's level.",
} as const satisfies WorldTitle
