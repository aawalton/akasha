import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiArdek = {
  id: "01a0ea75-bc71-7d2d-b723-aac5fac38733",
  type: "page-type/lore",
  slug: "otherwhere-xi-ardek",
  title: "Ardek",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-ardek",
  facts: [
    {
      fact: "Ardek is a young hunter on the wild path from a frontier village at the Deadshield's north edge.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ardek's path lets him always find his way back to any place he has been.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The hunter Kordek was Ardek's mentor; Kordek was turned into a spider hybrid and burned.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ardek fought beside Viv when the spider herald of Octas besieged his village.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ardek broke an oath sworn on Enttiku and betrayed Viv to the Enorian royalists near Seldon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Enttiku's curse fell on Ardek for the broken oath, and he was left dying of it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The archpriest of Maranor at Lesso died bearing Ardek's sin to lift that curse.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nothing has been heard of Ardek in the many years since the royalist war; he is presumed dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
