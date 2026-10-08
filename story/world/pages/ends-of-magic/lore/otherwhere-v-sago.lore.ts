import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVSago = {
  id: "01a0e9fa-e2ae-73db-93a7-3da15ea7ccfc",
  type: "page-type/lore",
  slug: "otherwhere-v-sago",
  title: "Sago",
  world: "world/ends-of-magic",
  about: "world-organization/otherwhere-v-sago",
  facts: [
    {
      fact: "Sago builds high-walled galleons like castles for long voyages.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sago ships carry shipseers, whose skills can pierce concealment at sea.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sago ships call at Litcliff.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T21:45:28.494Z",
  updatedAt: "2026-09-28T21:45:31.000Z",
} as const satisfies Lore
