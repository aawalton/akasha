import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const breathOfTheWildTime = {
  id: "01a10331-b562-760f-8aa4-49cf6b934c25",
  type: "page-type/world-mechanic",
  slug: "breath-of-the-wild-time",
  title: "Time",
  world: "world/hyrule",
  description:
    "The day and hour on the Great Plateau in autumn, counted from the morning Link wakes as 1 October on the beats' clock.",
} as const satisfies WorldMechanic
