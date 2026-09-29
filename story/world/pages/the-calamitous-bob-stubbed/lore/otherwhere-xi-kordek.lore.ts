import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiKordek = {
  id: "01a0ea8a-d22b-798a-81f4-7145dc30d4f0",
  type: "page-type/lore",
  slug: "otherwhere-xi-kordek",
  title: "Kordek",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-kordek",
  facts: [
    {
      fact: "Kordek was a hunter of a frontier village at the Deadshield's northern edge.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kordek mentored the young hunter Ardek.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kordek's wife Leria became the herald of Octas, the Spider Queen.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kordek was turned into a spider hybrid and killed Old Lildy, the village wise woman.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Arthur burned the Kordek-hybrid to death; Kordek is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
