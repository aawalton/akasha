import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiWandOfForce = {
  id: "01a0e9d1-a3d9-7f65-9ce4-78f1c30eb177",
  type: "page-type/lore",
  slug: "otherwhere-ii-wand-of-force",
  title: "The Wand of Force",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "A Wand of Force fires a cone of kinetic force that flings targets and deflects projectiles.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its power scales with its bearer's Magic, and its reach with the Wand skill.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T21:00:25.433Z",
  updatedAt: "2026-09-28T22:38:17.000Z",
} as const satisfies Lore
