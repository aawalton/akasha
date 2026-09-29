import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiEdria = {
  id: "01a0ea7f-d848-7c8c-96b1-bf78d4164375",
  type: "page-type/lore",
  slug: "otherwhere-xi-edria",
  title: "Magister Edria",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-edria",
  facts: [
    {
      fact: "Magister Edria is the senior student of the air archmage Frosthawk, a mage of Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Edria exhausted her mana reactivating the obelisks when the undead horde took Asterley.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Edria is thought to be with Frosthawk's mages in Harrak after the war.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
