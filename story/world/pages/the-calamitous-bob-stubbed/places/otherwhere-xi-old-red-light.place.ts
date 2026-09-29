import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiOldRedLight = {
  id: "01a0ea8c-0796-781a-9fd1-df7f27e09c29",
  type: "page-type/place",
  slug: "otherwhere-xi-old-red-light",
  title: "Old Red Light",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-shadowlands",
  facts: [
    {
      fact: "Old Red Light is the largest island of the Shadowlands archipelago, and a volcano.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Old Red Light's great eruption ashed the isles and turned the Shaded Lands into the Shadowlands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ash from Old Red Light's eruption fell as far as Harrak's Imperial Ziggurat.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Old Red Light's ash darkened the Shadowlands' sky.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Shadowlanders say their ashen gray skin comes from Old Red Light's ash.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Old Red Light erupted in the time of Korrim's civil war against Kor the Baleful.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
