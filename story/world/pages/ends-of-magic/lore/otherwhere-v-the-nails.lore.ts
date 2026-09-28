import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVTheNails = {
  id: "01a0e9f4-5850-7313-a982-9e6d1dc02fe5",
  type: "page-type/lore",
  slug: "otherwhere-v-the-nails",
  title: "The Nails",
  world: "world/ends-of-magic",
  about: "world-organization/otherwhere-v-the-nails",
  facts: [
    {
      fact: "The Nails are a Giantsrest organization headed by the archmage Cala dha Drex.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "After a Giantsrest lockdown, the Nails question the first person to leave.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
