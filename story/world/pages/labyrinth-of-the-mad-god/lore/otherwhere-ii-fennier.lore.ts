import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiFennier = {
  id: "01a0e9cf-bd36-77b6-a22c-47cebf910c9e",
  type: "page-type/lore",
  slug: "otherwhere-ii-fennier",
  title: "Fennier the Swarm King",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Fennier the Swarm King is a monarch whose body is a cloud of venomous insects.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Natives of its world also call it Fenrir.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T20:58:20.854Z",
  updatedAt: "2026-09-28T22:33:51.000Z",
} as const satisfies Lore
