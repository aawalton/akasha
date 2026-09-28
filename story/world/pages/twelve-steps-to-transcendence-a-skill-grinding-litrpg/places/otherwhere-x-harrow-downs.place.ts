import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXHarrowDowns = {
  id: "01a0ea72-d93f-7e62-9187-eacae53c5811",
  type: "page-type/place",
  slug: "otherwhere-x-harrow-downs",
  title: "Harrow Downs",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  within: "place/otherwhere-x-harrow-vale",
  facts: [
    {
      fact: "Harrow Downs are open chalk hills of short turf south and east of the village.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harrow's sheep graze the downs by day and are penned in wattle folds at night.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gideon Pike keeps a shepherd's hut on the downs and sits up nights with a sling and dog.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gideon's dog is Ash, an old black bitch who hates the wolves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The wolves come onto the downs by the dry valley on the Brackwood side.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gideon would pay a silver to anyone who helps him guard his fold through a night.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  exits: [
    {
      to: "place/otherwhere-x-harrow",
      way: "down the sheep track to the village",
      direction: "north",
    },
  ],
} as const satisfies Place
