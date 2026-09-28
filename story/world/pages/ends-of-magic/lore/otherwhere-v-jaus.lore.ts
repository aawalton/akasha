import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVJaus = {
  id: "01a0e9fc-4337-7a7d-842f-65e809c1a495",
  type: "page-type/lore",
  slug: "otherwhere-v-jaus",
  title: "Jaus",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-jaus",
  facts: [
    {
      fact: "Jaus owns a magic club that grows in size as it is swung.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Jaus is tied to Litcliff, the southern port city.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
