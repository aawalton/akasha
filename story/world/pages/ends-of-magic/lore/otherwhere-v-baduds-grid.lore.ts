import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVBadudsGrid = {
  id: "01a0e9fc-7096-781c-9c08-4284d3780735",
  type: "page-type/lore",
  slug: "otherwhere-v-baduds-grid",
  title: "Badud's Grid",
  world: "world/ends-of-magic",
  about: "world-organization/otherwhere-v-baduds-grid",
  facts: [
    {
      fact: "Badud's grid is an old grid of four Questors, all mages: Badud, Sussu, Amoh and Ogarius.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Badud's grid founded Giantsrest and Esebus; Esebus is its center.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sussu rules Esebus for the grid, and Badud rules the cavern-city Sangrad as Archlord.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Amoh, a shadow-using Questor, leads the Seminary of Assassins.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ogarius keeps assassin cells and holds Estefar; his plain staff was once a god's walking stick.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Badud's grid is the chief enemy of Sarya's grid; they have dueled for the last few Endings.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A pact between the two grids sets the Questor Brox to counter Badud.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Aleph grid is allied with Badud's grid.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
