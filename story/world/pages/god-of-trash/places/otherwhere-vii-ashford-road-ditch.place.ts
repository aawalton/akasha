import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViiAshfordRoadDitch = {
  id: "01a0ea1d-8142-7835-8057-10159ee5a233",
  type: "page-type/place",
  slug: "otherwhere-vii-ashford-road-ditch",
  title: "The ditch by the Ashford road",
  world: "world/god-of-trash",
  facts: [
    {
      fact: "A muddy ditch runs beside a rutted cart road through flat farmland.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-vii-nala"],
    },
    {
      fact: "The ditch holds shallow brown water, reeds and a scatter of rubbish: rags, shards, a boot.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-vii-nala"],
    },
    {
      fact: "Far off, a mountain rises with a white city at its top whose towers seem to float.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-vii-nala"],
    },
    {
      fact: "The road runs toward a village of thatched roofs about a mile off, with smoke rising.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-vii-nala"],
    },
    {
      fact: "The village is Ashford, a farming village a few days' travel from the mountain.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A cart comes along the road from Ashford most mornings, bound for the market town.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The ditch water is foul and unsafe to drink; a clean well sits at Ashford's green.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
