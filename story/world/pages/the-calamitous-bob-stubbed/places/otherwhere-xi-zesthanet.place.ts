import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiZesthanet = {
  id: "01a0ea86-d673-7bcc-860a-3ef989310795",
  type: "page-type/place",
  slug: "otherwhere-xi-zesthanet",
  title: "Zesthanet",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-param",
  facts: [
    {
      fact: "Zesthanet is the southernmost city of Param, far past the southern wildlands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Zesthanet is the only port city on Param's south coast, by the White Sea.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Zesthanet's warriors are pale, wield heavy weapons and wear bone helmets.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Zesthanet's shamans give warriors battle names; one old shaman carries a bone mace.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Other Paramese call the folk of Zesthanet barbarians.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Zesthanet is a member of the Paramese Alliance and sent warriors to the Glastian purge.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
