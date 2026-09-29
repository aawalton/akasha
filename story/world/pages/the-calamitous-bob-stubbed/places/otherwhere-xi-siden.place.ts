import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiSiden = {
  id: "01a0ea88-4595-7230-8761-399b2284fbd3",
  type: "page-type/place",
  slug: "otherwhere-xi-siden",
  title: "Siden",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-baran",
  facts: [
    {
      fact: "Siden is a merchant city in the far north-west of Baran, near the border of Helock's lands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Siden is a trading hub of banks and warehouses, with a portal gate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Siden is sometimes spelled Sidel.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Queen Rosea of Baran was at Siden when Baran's civil war began this winter.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harrak announced an Alliance muster near Siden this winter as a feint.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Oleander's forces took Siden early in the winter war; its portals were sabotaged.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
