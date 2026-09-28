import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViiPurpleDawnRuins = {
  id: "01a0ea41-4b63-7b56-a87e-467432fd346e",
  type: "page-type/place",
  slug: "otherwhere-vii-purple-dawn-ruins",
  title: "The ruins of Purple Dawn",
  world: "world/god-of-trash",
  facts: [
    {
      fact: "Purple Dawn Academy was a dark castle city on a mountain at the Alliance's eastern border.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its roofs were purple metal, and its banner a gold sun on purple.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It fell to the Empire in a night; now its barrier is gone, its walls broken and unguarded.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Scavengers pick the ruins, and the library there stands empty, its windows smashed.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
