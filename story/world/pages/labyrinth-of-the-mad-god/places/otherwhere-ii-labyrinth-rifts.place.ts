import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIiLabyrinthRifts = {
  id: "01a0e9be-c9be-7036-9cde-e89ef5c114b4",
  type: "page-type/place",
  slug: "otherwhere-ii-labyrinth-rifts",
  title: "Earth's Gates to the Labyrinth",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-ii-earth",
  facts: [
    {
      fact: "Earth has four entrances to the Labyrinth, sealed during the protection year.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "One lies in the far corner of the badlands between ruby pillars the size of skyscrapers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The System urges every settlement to fortify the gates before the seal fails.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
