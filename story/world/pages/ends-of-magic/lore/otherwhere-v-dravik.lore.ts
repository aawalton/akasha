import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVDravik = {
  id: "01a0e9f9-d8c4-751d-8317-0b7f76162efc",
  type: "page-type/lore",
  slug: "otherwhere-v-dravik",
  title: "Dravik",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-dravik",
  facts: [
    {
      fact: "Dravik is one of the old gods, whose divine mana shines blue.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dravik died with the other gods in the Ending of Deicide.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
