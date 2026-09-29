import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiPhaerus = {
  id: "01a0ea84-282d-7818-8b45-c518899ff656",
  type: "page-type/lore",
  slug: "otherwhere-xi-phaerus",
  title: "Phaerus",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-phaerus",
  facts: [
    {
      fact: "Phaerus is a mage of Frostway in the old Harrakan Remnants, the rival of Frosthawk.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Phaerus and Frosthawk evacuated Frostway's school of magic when the golems wrecked the city.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Phaerus is in Frostway, now a city of New Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
