import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIvUpstreamWoods = {
  id: "01a0e9ff-7edd-79c3-ac90-76fe4527f331",
  type: "page-type/place",
  slug: "otherwhere-iv-upstream-woods",
  title: "The Woods Above the Bend",
  world: "world/beware-of-chicken",
  within: "place/otherwhere-iv-azure-hills",
  exits: [
    {
      to: "place/otherwhere-iv-willow-bend",
      way: "Down the deer track along the river out of the woods to Willow Bend.",
    },
  ],
  facts: [
    {
      fact: "Above Willow Bend the valley narrows into steep woods of pine, bamboo and old camphor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A deer track follows the river up for some ten li to a mossy gorge with a small waterfall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Villagers gather bamboo shoots and firewood only in the lower woods, and only by daylight.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A boar the villagers call Old Tusk roots in the upper woods, bigger than any water buffalo.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Old Tusk has broken three terrace walls this spring, always at night, and eaten young rice.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tie Bo tracked Old Tusk twice, and found his hoofprints as wide as a man's two hands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The boar's wallow lies in a boggy hollow below the gorge, ringed by torn-up earth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wild mountain yam, mushrooms, and pheasant are there for anyone patient in the lower woods.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Leeches thrive in the wet bamboo, and a green pit viper hides in the leaf litter.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wolves have not been seen in the valley for a generation, though foxes are common.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
