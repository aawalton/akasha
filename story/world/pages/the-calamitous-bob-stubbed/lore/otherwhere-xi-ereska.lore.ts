import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiEreska = {
  id: "01a0ea7e-193f-732a-aa69-3094d26a8f3b",
  type: "page-type/lore",
  slug: "otherwhere-xi-ereska",
  title: "Ereska of Saref",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-ereska",
  facts: [
    {
      fact: "Ereska of Saref is a northern mage, sister of Viv's dead mentor and lover Varska.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ereska looks much like her sister Varska, and is estranged from her family.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ereska was Viv's roommate at the Helock Academy, and loves gossip.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ereska likely taught Rakan Varska's stone-spear hail spell, the Ballista.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viv wept with Ereska when she understood she would never see her family again.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ereska keeps the Earth music device Viv was given by the god Emeric.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Where Ereska is this season is unknown; she was last known at the Academy in Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
