import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViKestrelTower = {
  id: "01a0ea32-6dc0-7276-8a00-8506b76116c1",
  type: "page-type/place",
  slug: "otherwhere-vi-kestrel-tower",
  title: "Kestrel Tower",
  world: "world/wolf-girl-evolution-tails-teeth-and-too-much-food",
  within: "place/otherwhere-vi-greypine-weald",
  facts: [
    {
      fact: "Kestrel Tower is a roofless stone watchtower on a crag, a day's walk east of Moss Hollow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The tower was built in the expansion era and left empty some eighty years ago.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "From the tower's top, the whole Weald, the Carrow and Brackenford's smoke can be seen.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kestrels nest in the tower's upper windows.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Earthen Bear hunts the slopes below the tower's crag.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
