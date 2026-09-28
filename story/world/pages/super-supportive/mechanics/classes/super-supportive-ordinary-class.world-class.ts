import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveOrdinaryClass = {
  id: "01a0e9f5-fdeb-75ad-a53d-154a051012ad",
  type: "page-type/world-class",
  slug: "super-supportive-ordinary-class",
  title: "ordinary class",
  world: "world/super-supportive",
  description: "The Artonan class of people who are not wizards.",
} as const satisfies WorldClass
