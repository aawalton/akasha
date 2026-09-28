import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxLizardman = {
  id: "01a0ea35-942f-78ac-b22e-25fffb46d5ba",
  type: "page-type/lore",
  slug: "otherwhere-ix-lizardman",
  title: "Lizardman",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-species/otherwhere-ix-lizardman",
  facts: [
    {
      fact: "Lizardmen are scaled, lizard-like humanoids who live and work among Firrelia's other peoples.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lizardmen drink, dice and arm-wrestle in the tavern across from the smithy under the arena.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lizardmen there drink beside slaves, fighters and workers of every kind, and none remark on it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
