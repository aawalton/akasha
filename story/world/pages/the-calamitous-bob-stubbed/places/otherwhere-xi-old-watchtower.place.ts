import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiOldWatchtower = {
  id: "01a0ea77-aa5f-7f81-8cad-77ed99fe2eb2",
  type: "page-type/place",
  slug: "otherwhere-xi-old-watchtower",
  title: "The Old Watchtower",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-wether-hills",
  exits: [
    {
      to: "place/otherwhere-xi-tavelford",
      way: "Down the ridge path southwest, three hours to the village.",
    },
  ],
  facts: [
    {
      fact: "The old watchtower is a roofless stone tower on the ridge three hours northeast of Tavelford.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The tower was built long ago to watch the desert road; its stair still climbs to the top.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "From the tower's top one sees the whole valley, the shrine hill and the road to the north.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nine runaway Sheem soldiers camp in the tower's walled yard under a stolen tarpaulin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The runaways fled the winter battles at Barrier and Sandsong and dare not go home to Sheem.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sergeant Rasid Kel leads the runaways: lean, scarred, a second-step soldier, and not cruel yet.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The runaways keep spears, two bows, a crossbow and short swords, and some mail shirts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The runaways are hungry, cold and quarrelsome, and half of them want to turn to worse than theft.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Two runaways, Dov and Makram, would sell a lone stranger to a slaver for the price.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The runaways keep one man on watch on the tower top by day, and a fire in the yard by night.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tobin knows of soldiers at the old tower, and fears they rob travellers.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-xi-nala",
        "character-other/otherwhere-xi-tobin-ashlar",
      ],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
