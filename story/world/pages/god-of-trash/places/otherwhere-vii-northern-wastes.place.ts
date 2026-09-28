import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViiNorthernWastes = {
  id: "01a0ea41-4b62-7d05-832b-ff6aef625349",
  type: "page-type/place",
  slug: "otherwhere-vii-northern-wastes",
  title: "The northern wastes",
  world: "world/god-of-trash",
  facts: [
    {
      fact: "North of the Alliance lie snowfields, giant forests and frozen wastes, far above Orphela's power.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Giants live there, eight or nine feet tall, in towns with tables that resize for them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A border town of steep A-frame houses guards the pass, with a pawn shop and a giants' tavern.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Far north stands an ice city of white and sapphire, reshaped daily by ice-carver mages.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Northerners race elk, fish through ice, and wear furred robes and tall boots.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
