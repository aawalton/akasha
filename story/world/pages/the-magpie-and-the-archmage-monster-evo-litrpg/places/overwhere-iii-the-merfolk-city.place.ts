import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiTheMerfolkCity = {
  id: "01a0ed31-c669-7b18-a161-bcb252deef78",
  type: "page-type/place",
  slug: "overwhere-iii-the-merfolk-city",
  title: "The Merfolk City of the Southern Sea",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  exits: [
    {
      to: "place/overwhere-iii-oasis-dungeon",
      way: "Through the guarded gate and down a drain-like current.",
      direction: "down",
    },
    { to: "place/overwhere-iii-lab-island", way: "A swim to the small island nearby, now sunk." },
  ],
  facts: [
    {
      fact: "The merfolk city is one of the largest in the southern seas, grander than Thalasarra.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It lies deep in the warm southern seas, weeks of travel south of the Wrenmark.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Few humans know it exists; its merfolk hate humans.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Thalzor, a whale-shark merman, leads the city.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Commander Dolphar, a dolphin merman, leads its guards and holds strictly to its laws.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Homes are carved from white searock and covered in coral; carved sea beasts mark doors.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Swimming lanes are marked out by plants; glowing seashell lanterns light the city.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Prison caves lie beneath; their cells drain for air-breathers and can be flooded.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A training obstacle course serves its fit and proud people.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A gated dungeon entrance, guarded by scarred shark mermen, is the root of its wealth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Antkin caravans come through the dungeon to trade land goods for algae, fish and more.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "For half a year corrupted fish, dolphins and octopi attacked the city; now they have stopped.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Few merfolk here know holy magic.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "The city owes a monster bird and spider for ending the blight, and offers them refuge.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its best healer, the leafy sea-dragon merman Caspian, was exiled for walking on land.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
