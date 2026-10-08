import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVArdglass = {
  id: "01a0e9f5-b468-7eeb-9952-9692612ed8ba",
  type: "page-type/place",
  slug: "otherwhere-v-ardglass",
  title: "Ardglass",
  world: "world/ends-of-magic",
  facts: [
    {
      fact: "Ardglass is a settlement of Davrar.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T21:39:48.968Z",
  updatedAt: "2026-09-28T21:39:51.000Z",
} as const satisfies Place
