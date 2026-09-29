import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiHiramOfTheThousandBlades = {
  id: "01a0ea85-d3d6-7386-a368-e1c83126c6fc",
  type: "page-type/lore",
  slug: "otherwhere-xi-hiram-of-the-thousand-blades",
  title: "Hiram of the Thousand Blades",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-hiram-of-the-thousand-blades",
  facts: [
    {
      fact: "Hiram of the Thousand Blades was a storied Enorian warrior of the Blue Duke's line.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The deposed Blue Duke claims descent from Hiram; Hiram is long dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
