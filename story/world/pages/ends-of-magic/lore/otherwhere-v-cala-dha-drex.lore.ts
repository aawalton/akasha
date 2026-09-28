import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVCalaDhaDrex = {
  id: "01a0e9f8-a115-7312-9fb0-0ceb82e0901b",
  type: "page-type/lore",
  slug: "otherwhere-v-cala-dha-drex",
  title: "Cala dha Drex",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-cala-dha-drex",
  facts: [
    {
      fact: "Cala dha Drex is an archmage of the Nails, a Giantsrest order of lockdowns and interrogation.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Cala serves the Nails in Giantsrest.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
