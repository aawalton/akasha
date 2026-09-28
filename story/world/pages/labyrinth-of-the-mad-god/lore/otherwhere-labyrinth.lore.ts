import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereLabyrinth = {
  id: "01a0e9a5-b2a2-734a-a4ca-3adcfd9bec4c",
  type: "page-type/lore",
  slug: "otherwhere-labyrinth",
  title: "The Labyrinth",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The Labyrinth is a vast maze of worlds, dimensions and planes ruled by Taltos.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Within the Labyrinth the System's influence is weaker and its rules warped.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Labyrinth is split into sectors, which hold nodes linked by conduits.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nodes are pockets of stable space holding planets, moons or stars.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Conduits are passages between nodes, often littered with the wreckage of fallen worlds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Monsters prowl the conduits, and leaving a conduit's path is deadly.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The fringe is the newest, outer part of the Labyrinth, made of recently stolen worlds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Labyrinth feels alive, hungry and cruel to those with sharp senses.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
