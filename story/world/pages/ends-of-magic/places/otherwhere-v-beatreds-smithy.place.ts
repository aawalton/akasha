import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVBeatredsSmithy = {
  id: "01a0e9fd-94d3-7654-8353-8749b2671f2e",
  type: "page-type/place",
  slug: "otherwhere-v-beatreds-smithy",
  title: "Beatred's Smithy",
  world: "world/ends-of-magic",
  facts: [
    {
      fact: "Beatred's smithy makes weapons, among them rifles of wood and steel.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-28T21:48:25.171Z",
  updatedAt: "2026-09-28T21:48:29.000Z",
} as const satisfies Place
