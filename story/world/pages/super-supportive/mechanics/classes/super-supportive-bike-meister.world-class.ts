import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveBikeMeister = {
  id: "01a0e9f2-30de-721d-aa68-8cd9855a32e3",
  type: "page-type/world-class",
  slug: "super-supportive-bike-meister",
  title: "Bike Meister",
  world: "world/super-supportive",
  description: "A one-of-a-kind Meister class built around a motorcycle.",
} as const satisfies WorldClass
