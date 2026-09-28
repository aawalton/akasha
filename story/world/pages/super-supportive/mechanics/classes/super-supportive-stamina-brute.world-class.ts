import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveStaminaBrute = {
  id: "01a0e9f1-6aac-77e3-87ba-45d582f9ad56",
  type: "page-type/world-class",
  slug: "super-supportive-stamina-brute",
  title: "Stamina Brute",
  world: "world/super-supportive",
  aliases: ["Stamina"],
  description: "A Brute subclass focused on endurance.",
} as const satisfies WorldClass
