import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereFennier = {
  id: "01a0e9cf-bd36-77b6-a22c-47cebf910c9e",
  type: "page-type/lore",
  slug: "otherwhere-fennier",
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
} as const satisfies Lore
