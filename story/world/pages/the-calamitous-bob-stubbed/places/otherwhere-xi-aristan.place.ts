import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiAristan = {
  id: "01a0ea86-d66e-7cfb-9f2b-fecdd9ffe73b",
  type: "page-type/place",
  slug: "otherwhere-xi-aristan",
  title: "Aristan",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-enoria",
  facts: [
    {
      fact: "Aristan is a ruined, abandoned city on a mountain slope in Enoria.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Aristan's stone is scorched black and glassy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Aristan was razed by the dragon Judgment for trying to mine dragon breeding grounds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Judgment was called 'the Desolation of Aristan' for its destruction.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nero Oleander first came into the world in Enoria, near Aristan.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This winter Oleander turned his army west toward Aristan.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At Aristan this winter Oleander killed the ancient dragon Judgment with the sword Slayer.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Most of Maranor's elite champions died in the fighting at Aristan this winter.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
