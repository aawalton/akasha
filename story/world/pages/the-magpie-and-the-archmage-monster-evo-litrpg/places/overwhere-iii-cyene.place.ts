import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiCyene = {
  id: "01a0ed2d-97f5-7ce9-a535-a72b1aca3289",
  type: "page-type/place",
  slug: "overwhere-iii-cyene",
  title: "Cyene",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  exits: [
    {
      to: "place/overwhere-iii-cyene-dungeon",
      way: "Through the warded tunnel to the dungeon's entrance cavern.",
      direction: "down",
    },
    {
      to: "place/overwhere-iii-satyr-lake",
      way: "Several days along the river road toward Sunvale.",
    },
    { way: "About two weeks southeast by road to Abylport, past the Hell Marsh." },
    { way: "By train from the city's station." },
  ],
  facts: [
    {
      fact: "Cyene is a large walled city of the Velithra Dominion, weeks of travel south of the Wrenmark.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Duncan, Pillar of Iron Law, rules Cyene, and his rules show everywhere.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cyene is built of heavy stone and some metal, symmetrical, with spotless paved streets.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bushes are trimmed and flowerpots set in rows; by Duncan's order no birds nest there.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The gates in its stone wall have long queues; guards once searched every entrant.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Duncan abolished the special pass the Lord of Cyene had sold for entry.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Inner City, behind a second gate, holds Elite mansions and is closed to Commons.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lord Brakaar, a gaudy tax inspector of Iron Law, keeps a red-brick Inner City mansion.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Outside it is a rowdier district of pubs, inns, cafeterias and a bathhouse.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Iron Shore, a seafood restaurant, serves cave catfish from the dungeon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A far corner holds mines, loud magic-driven machines, minecarts and a blacksmith.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Cyene has a train station.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "The Adventurers Guild compound is full of green adventurers training in the dungeon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A warded tunnel with a collapse fail-safe runs from the city to Cyene Dungeon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cyene has no artifact artisans; it lacks the materials and a steady supply.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Veterans rate Cyene's adventurers low; it is a city for beginners.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sunvale is about a week and a half's walk away, by the river road past Satyr Lake.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Forestwind Mage Academy is over two weeks' walk from Cyene, near Abylport's coast.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Now, at winter's end, the blight in the dungeon's Area F has been cleared.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
