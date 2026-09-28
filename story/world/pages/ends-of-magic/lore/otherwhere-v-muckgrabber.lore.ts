import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVMuckgrabber = {
  id: "01a0e9f9-9dd8-73b9-80cc-717e61ca7ae7",
  type: "page-type/lore",
  slug: "otherwhere-v-muckgrabber",
  title: "Muckgrabber",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-muckgrabber",
  facts: [
    {
      fact: "Muckgrabbers are known for their stench and filth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"Muckgrabber" is an insult, and "a bunch of muckgrabbers" means a crowd of fools.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"The muckgrabber reveals his stench" means a foe has shown his hand.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"Blacker than a muckgrabber\'s asshole" describes deep darkness.',
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
