import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiLandshark = {
  id: "01a0e9c3-c617-778a-b173-b0f7285c16b1",
  type: "page-type/lore",
  slug: "otherwhere-ii-landshark",
  title: "Landsharks",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "A landshark is a hippo-sized beast with a beetle's shell, six legs, a horn and a fin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It dives into soil and swims through the ground with only its black fin showing.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It chases prey for over an hour for the joy of it, but a river throws it off the trail.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
