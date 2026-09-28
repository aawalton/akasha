import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveDuel = {
  id: "01a0e9f9-1fa2-7e9a-9f7a-539460d12d87",
  type: "page-type/world-mechanic",
  slug: "super-supportive-duel",
  title: "Dueling Block",
  world: "world/super-supportive",
  aliases: ["duel", "territory claim game"],
  description:
    "A timed one-on-one gym duel in a walled block, with an objective set by the System.",
} as const satisfies WorldMechanic
