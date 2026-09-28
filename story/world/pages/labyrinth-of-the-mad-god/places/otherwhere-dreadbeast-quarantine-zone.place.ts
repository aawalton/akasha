import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereDreadbeastQuarantineZone = {
  id: "01a0e9bf-c1f4-7902-b4e0-7b7279762015",
  type: "page-type/place",
  slug: "otherwhere-dreadbeast-quarantine-zone",
  title: "The Dreadbeast Quarantine Zone",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The quarantine zone lies on the one planet of a major node with three moons and a red sun.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A multicolored barrier dome a few hundred miles wide seals it, and its touch erases a body.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Inside, the forests are blighted, and mana drains into the ground toward the lairs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Five biomes ring an evacuated royal capital at the center.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Cratered Lands are meteor craters and deep crevices.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Emerald Expanse is prairie and forest that are lush no longer.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Misty Expanse is a tropical jungle, and the Burning Wastes hold dozens of volcanoes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Hungering Mire is a fetid swamp of waterways, sinkholes and quicksand.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dread storms of brown cloud and green lightning roam and drain whatever they strike.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The rift seals behind entrants until the quest is done.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
