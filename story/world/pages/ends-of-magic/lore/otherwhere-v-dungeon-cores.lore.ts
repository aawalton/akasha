import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVDungeonCores = {
  id: "01a0e9fb-c0e6-7714-aff6-57a0c2bf7f95",
  type: "page-type/lore",
  slug: "otherwhere-v-dungeon-cores",
  title: "Dungeon Cores",
  world: "world/ends-of-magic",
  about: "world-item/otherwhere-v-dungeon-cores",
  facts: [
    {
      fact: "A dungeon core holds a magical intelligence and the power of its dungeon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A captured dungeon core can be bound by a control spell and made to power golems.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Ascendant Academy's guardian golems draw their power from its dungeon core.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "If the control spell on a dungeon core breaks, the golems it powers run amok.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
