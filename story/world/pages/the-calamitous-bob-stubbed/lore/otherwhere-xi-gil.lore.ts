import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiGil = {
  id: "01a0ea83-df25-79e7-83a6-73889d7bbdfc",
  type: "page-type/lore",
  slug: "otherwhere-xi-gil",
  title: "Prince Gil",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-gil",
  facts: [
    {
      fact: "Gil is Crown Prince of Enoria, son of King Sangor; he is peppy and wears a bad mustache.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Church of Maranor once held Gil hostage in Mornyr to keep King Sangor in check.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viv freed Gil from Maranor's temple at Mornyr, sealing a secret defensive pact with Enoria.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gil was portalled home and named heir in a ceremony at Three Rivers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gil brought two regiments of Dead Eyes archers to help Harrak against the undead horde.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In the final war Oleander held Gil hostage, forcing Sangor to side with Maranor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The blademaster Solar freed Gil, and Enoria turned on Oleander mid-battle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Gil is with Enoria's forces, free, after the victory on the Plain of the Gods.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
