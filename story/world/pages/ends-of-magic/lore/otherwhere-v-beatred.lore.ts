import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVBeatred = {
  id: "01a0e9f8-0f1b-75ab-a3a2-61dbaf073bce",
  type: "page-type/lore",
  slug: "otherwhere-v-beatred",
  title: "Beatred",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-beatred",
  facts: [
    {
      fact: "Beatred is a smith of Gemore who keeps a smithy there.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Beatred works the forge in Gemore.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T21:42:23.259Z",
  updatedAt: "2026-09-28T21:42:26.000Z",
} as const satisfies Lore
