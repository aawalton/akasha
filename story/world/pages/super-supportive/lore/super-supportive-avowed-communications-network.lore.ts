import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const superSupportiveAvowedCommunicationsNetwork = {
  id: "01a0e9fa-71c1-74cf-bbdb-b8dc01d99065",
  type: "page-type/lore",
  slug: "super-supportive-avowed-communications-network",
  title: "Avowed Communications Network",
  world: "world/super-supportive",
  about: "world-mechanic/super-supportive-avowed-communications-network",
  facts: [
    {
      fact: "It is the System's phone network for a planet, reached by a very long number.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
