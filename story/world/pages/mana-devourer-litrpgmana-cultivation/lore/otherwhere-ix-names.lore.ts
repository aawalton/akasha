import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxNames = {
  id: "01a0ea39-ef40-71d0-862b-06f952350a05",
  type: "page-type/lore",
  slug: "otherwhere-ix-names",
  title: "Names",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-mechanic/otherwhere-ix-names",
  facts: [
    {
      fact: "Firrelian names carry meanings, and a name with none is unusual.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "On hearing a new name, Firrelians ask what it means.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The bengai name Rika means Daughter of Light.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The goddess Serena says her name does not mean anything.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some bear an epithet after their name, as the imp baron Drathok of the Severed Star does.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Altok carry clan names, and their families feud clan against clan.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gods go by their virtue as a title, such as Randall, God of Benevolence.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A beast bonded to someone is named by its keeper; a god may ask whether it has been named.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
