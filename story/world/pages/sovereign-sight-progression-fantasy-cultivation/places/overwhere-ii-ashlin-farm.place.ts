import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiAshlinFarm = {
  id: "01a0fd5a-a38b-7df2-8a61-6269e4756d07",
  type: "page-type/place",
  slug: "overwhere-ii-ashlin-farm",
  title: "Ashlin Farm",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  within: "place/overwhere-ii-wendlemere",
  facts: [
    {
      fact: "Ashlin Farm sits half a day down the valley road from Wendle Ford, off a lane between high hedges.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its folk left for Carrowmouth last autumn, and the farm has been empty all winter.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
    {
      fact: "A long, low stone farmhouse faces a stone barn across an open yard of trodden mud.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The barn's hayloft door looks straight down on the yard and the end of the lane.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Behind the farm, Ashlin Beck runs in a wooded gully that reaches the back of the barn unseen.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "From the beck gully a man can reach the barn's back wall without crossing open ground.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
