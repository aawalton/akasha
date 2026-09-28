import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxTheForbiddenGoddess = {
  id: "01a0ea36-ee5d-7247-9424-ac441d1d2593",
  type: "page-type/lore",
  slug: "otherwhere-ix-the-forbidden-goddess",
  title: "The Forbidden Goddess",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-character/otherwhere-ix-the-forbidden-goddess",
  facts: [
    {
      fact: "The Forbidden Goddess is a vanished goddess whose name begins Ser-.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The demon lord Elasar forbids her name to be spoken in his hearing.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She has been gone longer than almost anyone can remember; Elasar remembers her.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Elasar fears her still: gone need not mean dead, nor powerless mean powerless, for a true god.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season no one openly claims to have seen the Forbidden Goddess.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
