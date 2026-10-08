import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiCoyotes = {
  id: "01a0e9c3-c616-7d18-b318-9776a4f73101",
  type: "page-type/lore",
  slug: "otherwhere-ii-coyotes",
  title: "Badlands Coyotes",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Badlands coyotes are territorial but peaceful toward travelers who leave meat.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Their leaders grow to the size of a bull and wear leather that folds into harness bags.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Their speech compounds ideas, such as friend-of-my-child and giver-of-meat.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-28T20:45:16.694Z",
  updatedAt: "2026-09-28T22:32:31.000Z",
} as const satisfies Lore
