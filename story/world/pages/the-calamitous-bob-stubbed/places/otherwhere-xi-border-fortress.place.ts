import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiBorderFortress = {
  id: "01a0ea8a-7b77-791c-8990-f7474cef4927",
  type: "page-type/place",
  slug: "otherwhere-xi-border-fortress",
  title: "The Border Fortress",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-kark-steppes",
  facts: [
    {
      fact: "The Border Fortress, or Frontier Citadel, was Luten's village-sized keep on the steppe frontier.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Border Fortress lay between a drying river and a steep hill, with flat fields to the east.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harrak and the Red Tribe stormed the Border Fortress ten years ago; a landship rammed its gate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Border Fortress was razed by treaty, Baran acting as arbiter.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A grotesque tree of black magic, raised by Viv, overgrows the ruins of the Border Fortress.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "By treaty Luten keeps the land east of the Border Fortress's ruins.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Around the Border Fortress lie abandoned farmsteads, derelict mills and dust.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
