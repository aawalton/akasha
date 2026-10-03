import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const theVioletHourTheSystem = {
  id: "01a10377-837c-73e2-96cc-bafe4fb1a3c9",
  type: "page-type/world-mechanic",
  slug: "the-violet-hour-the-system",
  title: "The System",
  world: "world/personas",
  description:
    "The quiet power at the waystation by the lake that notices each small kindness a traveler does for themself and marks it with a soft chime: a named stat and its new level, such as Rest, level one. It never fights or warns, and its chimes grow quieter as the traveler settles. Each stat a traveler gains is a number of its own that starts at level one and rises one level at a time.",
} as const satisfies WorldMechanic
