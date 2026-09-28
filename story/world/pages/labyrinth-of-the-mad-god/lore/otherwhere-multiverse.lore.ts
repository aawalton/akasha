import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereMultiverse = {
  id: "01a0e9a5-b2a3-7e17-96c9-c05fc7ca108e",
  type: "page-type/lore",
  slug: "otherwhere-multiverse",
  title: "The Multiverse",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The multiverse holds countless integrated worlds joined by the System's portal network.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "System portals break travellers down into energy and rebuild them at the far end.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Long portal trips cause portal sickness, a dizzy disorientation.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Integrated species are graded, and many are hostile and predatory to newcomers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some worlds run on compressed time, where a month passes in a day outside.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
