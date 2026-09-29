import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSin = {
  id: "01a0ea88-523b-74f1-b648-01f1a4645eb8",
  type: "page-type/lore",
  slug: "otherwhere-xi-sin",
  title: "Sin",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-sin",
  facts: [
    {
      fact: "Sin is Viv's sworn guard, a Janar of Sandsong in Vizim.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sin is the child of Kass Tilaperisi, uncle of Sandsong's late queen.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sin saw Harrak's ambush destroy the Nemeti fleet at the Grand Beach.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mar the Younger, a Ravinport scout, courts Sin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Sin serves Viv as a sworn guard after the last war.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
