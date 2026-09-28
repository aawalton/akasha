import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViiSnowdropMountain = {
  id: "01a0ea3f-8a34-7350-b9d2-1fd190c977bb",
  type: "page-type/place",
  slug: "otherwhere-vii-snowdrop-mountain",
  title: "The mountain",
  world: "world/god-of-trash",
  facts: [
    {
      fact: "The mountain rises three days west of Ashford, crowned by the white city of the Snowdrop school.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Snowdrop school's white towers glow gold at sunset, and some seem to float.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A walled mortal town of some ten thousand clings to the mountain's side below the school.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The town has cobbled streets, overhanging houses, an orphanage, and gates shut at night.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The town's rubbish goes into a round pit below a short cliff, mages' rubbish with it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Snowdrop keeps a code of not meddling with mortals, but forbids harm to its mortals.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The town hosts the Varian Regional Mixed Tournament, three days, open to all fighters.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This year's tournament is held at the end of autumn, some fifty days from now.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At the tournament schools recruit, fighters gulp potions, and the arena fills with rubbish.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The town's bookshop keeps two spellbooks in the window at ten gold each.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
