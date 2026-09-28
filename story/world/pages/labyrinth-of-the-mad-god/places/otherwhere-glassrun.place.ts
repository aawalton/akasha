import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereGlassrun = {
  id: "01a0e98e-a9b8-7490-a8a0-e6e43c6bc249",
  type: "page-type/place",
  slug: "otherwhere-glassrun",
  title: "The Glassrun",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-cinder-isle",
  facts: [
    {
      fact: "The Glassrun is a clear stream running west from the foothills to the sea.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It meets the Black Shore about two miles south of where Nala woke, between double palm rows.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-nala"],
    },
    {
      fact: "Its lowest half mile runs brackish with the tide, too salt to drink.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Upstream of that it runs fresh and cold over black stones.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some two miles inland it falls over a black rock lip into the Stillpool, deep and clear.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The game trail from the Black Shore's treeline reaches the Glassrun below the Stillpool.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The wood's beasts drink at the Glassrun, most at dawn and dusk.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Reeds and deep mud line the lower banks; above the Stillpool the banks are rock.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-nala"],
    },
    {
      fact: "The Glassrun's water is clean to drink raw.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
