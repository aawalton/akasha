import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiLeras = {
  id: "01a0ea8f-a12b-7740-a43b-fd9a8874fd73",
  type: "page-type/lore",
  slug: "otherwhere-xi-leras",
  title: "Leras",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-leras",
  facts: [
    {
      fact: "Leras was a Baranese soldier of Captain Cernit's company on the Hallurian border.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Leras died on the marches of Baran in the war against Halluria; Leras is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
