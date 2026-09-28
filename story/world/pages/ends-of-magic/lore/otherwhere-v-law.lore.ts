import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVLaw = {
  id: "01a0ea05-739b-7785-b08d-340e626ac6a5",
  type: "page-type/lore",
  slug: "otherwhere-v-law",
  title: "Law",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-law",
  facts: [
    {
      fact: 'A "blood price" is the standard compensation paid for a death.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Truce of Ostren forbids attacks within Ostren.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some nations form defensive treaties and specialize in monster-killing Insights.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Slavery is lawful in Giantsrest, and debt indenture in Esebus; Gemore is a haven from both.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ports and walled cities check those entering, and some demand passes or badges.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Davrar itself enforces the rules Questors set for their wars and Conclaves.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
