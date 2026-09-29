import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiGlassScar = {
  id: "01a0ea77-aa5e-7b72-9ba1-68cb98032322",
  type: "page-type/place",
  slug: "otherwhere-xi-glass-scar",
  title: "The Glass Scar",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-asmirel",
  facts: [
    {
      fact: "The Glass Scar is where the Wether Hills end and the desert begins, two days north of Tavelford.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Glass Scar is a long slope of cracked red rock strewn with glass globules from old fires.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Desert glass globules from the Scar sell to alchemists in Imra for a few silver each.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Elementals wander up to the Scar from the deep desert, and are easily offended.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A sand elemental roams the Scar this spring, a whirling man-high column of grit and heat.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "There is no water on the Scar but a seep in a gully marked by a stone cairn.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Salt traders once crossed the Scar to the desert pans; few do since the war.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
