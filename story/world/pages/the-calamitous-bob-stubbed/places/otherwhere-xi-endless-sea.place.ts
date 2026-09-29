import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiEndlessSea = {
  id: "01a0ea77-3d60-7fda-a252-5b9e8e0eb857",
  type: "page-type/place",
  slug: "otherwhere-xi-endless-sea",
  title: "The Endless Sea",
  world: "world/the-calamitous-bob-stubbed",
  facts: [
    {
      fact: "The Endless Sea lies west of Param, off the coasts of Harrak and its deadlands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No known ship has crossed the Endless Sea and come back.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Paramese sailors believe there may be land beyond the Endless Sea, but none has seen it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A deep rift opens in the Endless Sea far west of Harrak's coast.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Paramese sailors fear the Endless Sea's giant sharks and squids.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "End of the World, a free city of exiled mages, sits on Param's north-west tip by the sea.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
