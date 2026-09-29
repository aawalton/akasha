import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiKorrim = {
  id: "01a0ea8c-0795-7b74-83e8-b7dcb177493e",
  type: "page-type/place",
  slug: "otherwhere-xi-korrim",
  title: "Korrim",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-shadowlands",
  facts: [
    {
      fact: "Korrim is the most powerful city of the Shadowlands and the one that best survived.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Korrim is a harbor city; its harbor master once oversaw a busy port.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Korrim once ruled the Korrimian League through a Council of Elders.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Korrimian League's union of the isles led it into war with Vizim.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kor the Baleful, an ancient tyrant of Korrim, brought on a three-year civil war.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An elder called the Stone rose against Kor the Baleful.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nero Oleander became King of Korrim and from it united the Shadowlands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Under Oleander Korrim saw mass hangings; guilds were founded there.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mage families fled Korrim for the Azure Lady's haven, fearing Oleander's distrust of mages.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Korrim's best artisans reforged and enchanted Oleander's great shield.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In late winter Korrim has lost its king and has not surrendered to Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
