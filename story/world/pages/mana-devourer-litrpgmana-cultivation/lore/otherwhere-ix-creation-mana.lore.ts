import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxCreationMana = {
  id: "01a0ea46-88ca-70ff-9722-d564e9bdba9c",
  type: "page-type/lore",
  slug: "otherwhere-ix-creation-mana",
  title: "Creation Mana",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-mechanic/otherwhere-ix-creation-mana",
  facts: [
    {
      fact: "Creation mana is spoken of as the most raw and powerful form of mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Few mortal bodies could hold Creation mana without harm.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gods conjure objects and food at a gesture; a mere 'creation god' is thought a lesser god.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "To a god, conjuration and destruction are 'parlor tricks' beside true command of mana.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
