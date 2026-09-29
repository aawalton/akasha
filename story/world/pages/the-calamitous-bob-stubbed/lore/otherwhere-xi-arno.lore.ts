import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiArno = {
  id: "01a0ea77-aa11-731a-8856-7b6569461819",
  type: "page-type/lore",
  slug: "otherwhere-xi-arno",
  title: "Arno",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-arno",
  facts: [
    {
      fact: "Arno is an Enorian mage of King Sangor's court.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Arno's mana is red and brown, with a colorless sheen.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Arno was among the Enorians Viv met around the alliance summit at Mornyr.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No word of Arno has come from the final war; he is thought to be in Enoria's service still.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
