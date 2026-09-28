import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVDragonwolfHeights = {
  id: "01a0ea00-458b-78be-9697-eb58e41c1df7",
  type: "page-type/place",
  slug: "otherwhere-v-dragonwolf-heights",
  title: "The Dragonwolf Heights",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-serrin-vale",
  exits: [
    {
      to: "place/otherwhere-v-thornmouth",
      way: "South down the long wooded slopes to Thornmouth's cleft; two days on foot.",
      direction: "south",
    },
  ],
  facts: [
    {
      fact: "The Dragonwolf Heights are bare red-grey crags at the Serrin Vale's head, four days north.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Serrin rises as meltwater streams among the Heights' crags and screes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A pair of dragonwolves ranges over the Heights and the high wood below them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Burned patches of scalebark and scorched bones mark where the dragonwolves have hunted.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No villager goes to the Heights; rangers go only in strength, and seldom.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Anyone weak who meets the dragonwolves on the Heights is almost surely killed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Heights are cold, windy and already dusted with snow in early autumn.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
