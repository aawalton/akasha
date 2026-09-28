import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveBolstering = {
  id: "01a0e9f8-aa22-7e9e-a748-e7b71ab9509b",
  type: "page-type/world-mechanic",
  slug: "super-supportive-bolstering",
  title: "Bolstering",
  world: "world/super-supportive",
  aliases: ["authority assist"],
  description: "A wizard reaching out to touch another's being to support their skill.",
} as const satisfies WorldMechanic
