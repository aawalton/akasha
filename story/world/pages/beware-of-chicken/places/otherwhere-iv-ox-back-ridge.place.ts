import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIvOxBackRidge = {
  id: "01a0ea00-2951-778c-8f0c-0103c789bac1",
  type: "page-type/place",
  slug: "otherwhere-iv-ox-back-ridge",
  title: "Ox-Back Ridge",
  world: "world/beware-of-chicken",
  exits: [
    {
      to: "place/otherwhere-iv-three-stones-village",
      way: "Back along the market road, off the ridge and down to Three Stones.",
    },
    {
      to: "place/otherwhere-iv-lanqiao",
      way: "On along the market road, down off the ridge to Lanqiao.",
    },
  ],
  facts: [
    {
      fact: "The market road climbs over Ox-Back Ridge between Three Stones and Lanqiao.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The ridge path runs through pine for about eight li, the loneliest stretch of the road.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Travelers go over Ox-Back Ridge in groups and by daylight, and never on the day before market.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rumor says bandits robbed a silk trader on the ridge this spring and left him tied to a pine.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The yamen offers 5 silver taels for word leading to the ridge bandits taken alive.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
