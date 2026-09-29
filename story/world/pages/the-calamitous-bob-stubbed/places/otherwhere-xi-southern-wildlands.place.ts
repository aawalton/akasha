import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiSouthernWildlands = {
  id: "01a0ea86-d672-7e64-9da8-b6a3297daa71",
  type: "page-type/place",
  slug: "otherwhere-xi-southern-wildlands",
  title: "The Southern Wildlands",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-param",
  facts: [
    {
      fact: "The southern wildlands are the wild, marshy south of Param, home of beast-skin tribes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Southern tribesfolk are pale, with silex javelins, stone hammers and bone armor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Southern tribes wrestle to choose a warchief, and seal pacts with the words 'So witnessed'.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Southern warriors paint their faces as, or wear ash masks of, the strongest foe they slew.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Southern tribes have shamans who give warriors battle names.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Southern wildfolk weave snowshoes, unknown to Baranese soldiers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some southern tribes are slavers or cannibals and keep thralls.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The warborn tattoo ink used to enslave comes from the south.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Baran's South End march faces the southern tribes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Baran stopped southern raids by burning villages within fifty leagues of its border.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Zesthanet, Param's southernmost city and only south-coast port, lies past the wildlands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Southern tribes sent warriors to the Alliance against the Nemeti ten years ago.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The southern wildlands bred mages who turned to bone magic and lichdom.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
