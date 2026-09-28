import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVSuse = {
  id: "01a0e9f9-91ed-7b6c-b1f0-d659d675b48c",
  type: "page-type/lore",
  slug: "otherwhere-v-suse",
  title: "Suse",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-suse",
  facts: [
    {
      fact: "Suse is a slave in Giantsrest, a mage-empire that executes escaped slaves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Suse labors as a slave in the city of Giantsrest.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
