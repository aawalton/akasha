import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveUneven = {
  id: "01a0e9f1-cfc3-76cd-8d77-153833e2377d",
  type: "page-type/world-mechanic",
  slug: "super-supportive-uneven",
  title: "Uneven",
  world: "world/super-supportive",
  aliases: ["unevenness"],
  description:
    "The sense of someone as heavy or off to one side because they owe or are owed wordchain debt.",
} as const satisfies WorldMechanic
