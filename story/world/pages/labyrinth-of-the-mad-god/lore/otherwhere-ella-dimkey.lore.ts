import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereEllaDimkey = {
  id: "01a0e9ca-01ea-765a-b71e-ec7aec58a7c5",
  type: "page-type/lore",
  slug: "otherwhere-ella-dimkey",
  title: "Ella Dimkey",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Ella Dimkey is a red-haired human contestant of Earth and a centennial martial artist.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She has decades of martial mastery that go far beyond anything a skill can teach.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
