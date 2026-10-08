import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiUlys = {
  id: "01a0ea8b-9d76-73a1-ac7b-822336e74bb3",
  type: "page-type/lore",
  slug: "otherwhere-xi-ulys",
  title: "Ulys",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-ulys",
  facts: [
    {
      fact: "Ulys was an assistant professor at the Academy of Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ulys is dead, executed by the Academy, which kills any who plot against its students.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-29T00:23:33.494Z",
  updatedAt: "2026-09-29T00:23:43.000Z",
} as const satisfies Lore
