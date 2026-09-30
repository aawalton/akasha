import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiTarnScrees = {
  id: "01a0f3b8-4a9b-754f-8e00-bfa69349ba16",
  type: "page-type/place",
  slug: "overwhere-ii-tarn-screes",
  title: "The Tarn Screes",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  within: "place/overwhere-ii-wendlemere",
  facts: [
    {
      fact: "The Tarn Screes are grey rockfalls below Hollow Tarn's corrie, two hours' climb above Marsh Croft.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The greymaw den is a deep cleft in the screes, rank with rotten salt and strewn with sheep bones.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
    {
      fact: "By day the five greymaws left lie up in the den, sluggish and ill-tempered until dusk.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
    {
      fact: "Greymaw tracks are plain: webbed prints and smears of grey slime on the stones.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
    {
      fact: "From the den mouth the cairn hung with cold iron shows on the skyline above.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
    {
      fact: "On the way up lie a half-eaten ewe from last night's flight and tufts of scaled fur on the heather.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
    {
      fact: "The five greymaws left are together in the den through the day; one limps from the fight.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
  ],
} as const satisfies Place
