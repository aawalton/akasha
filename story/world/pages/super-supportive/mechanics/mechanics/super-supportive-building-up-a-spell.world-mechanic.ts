import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveBuildingUpASpell = {
  id: "01a0e9f8-aa22-7214-977f-0eae8834d138",
  type: "page-type/world-mechanic",
  slug: "super-supportive-building-up-a-spell",
  title: "Building up a spell",
  world: "world/super-supportive",
  aliases: ["casting together", "combined casting"],
  description:
    "Running through a spell with light authority, then layering and refining repetitions over hours or days.",
} as const satisfies WorldMechanic
