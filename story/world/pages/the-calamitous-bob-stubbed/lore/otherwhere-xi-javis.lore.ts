import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiJavis = {
  id: "01a0ea88-c43d-74de-840b-67447e8dc110",
  type: "page-type/lore",
  slug: "otherwhere-xi-javis",
  title: "Javis",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-javis",
  facts: [
    {
      fact: "Javis is a knight of Harrak under Rollo, of the order later called the Blue Rose.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Javis's wife and daughter were blinded.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Javis is thought to ride with Rollo's knights, stranded near Mornyr.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
