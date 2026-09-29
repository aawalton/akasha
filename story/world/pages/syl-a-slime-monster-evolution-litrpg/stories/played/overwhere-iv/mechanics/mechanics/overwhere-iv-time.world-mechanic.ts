import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const overwhereIvTime = {
  id: "01a0ed1e-65a8-7b24-874b-e706e4821168",
  type: "page-type/world-mechanic",
  slug: "overwhere-iv-time",
  title: "Time",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "The day and hour it is where Nala is, counted in days from the day she woke.",
} as const satisfies WorldMechanic
