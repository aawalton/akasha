import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiLeria = {
  id: "01a0ea8e-52d3-78fc-86dd-b0b95b6667e7",
  type: "page-type/lore",
  slug: "otherwhere-xi-leria",
  title: "Leria",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-leria",
  facts: [
    {
      fact: "Leria was a merchant's daughter who married the hunter Kordek of a frontier village.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Leria called the Koltisian marches the worst region in all of Enoria.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Leria became the herald of Octas: split jaw, extra eyes, spider legs from her back.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "As herald Leria besieged her village with spiders for days and tortured the boy Tewan to death.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Solfis killed Leria in the siege; Leria is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
