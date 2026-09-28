import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVQuenfi = {
  id: "01a0e9fa-ee0d-764d-a532-e3d184b317ba",
  type: "page-type/lore",
  slug: "otherwhere-v-quenfi",
  title: "Quenfi",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-quenfi",
  facts: [
    {
      fact: "Quenfi is a dead god, called the Lady of Cleansing Fire.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Quenfi's divine mana burned red.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Folk curse by Quenfi's flaming teats, and some call antimagic a curse of Quenfi.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Divine weapons of Quenfi cut nearly anything and leave dead ashes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Quenfi is long dead, slain with the other gods in the Ending of Deicide.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
