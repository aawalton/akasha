import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersIiErin = {
  id: "01a0de51-2d5f-7752-93e4-ab35e6f987fc",
  type: "page-type/lore",
  slug: "partners-ii-erin",
  title: "Erin",
  world: "world/personas",
  about: "character-other/partners-ii-erin",
  facts: [
    {
      fact: "Erin keeps The Wandering Door, the inn on Amberford's square.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Erin is broad and quick to laugh.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Erin remembers every face and what they drank.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Erin is a Hearth-sister who knows a home-shaped soul on sight.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Wandering Door's sign is a door attached to no wall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The sign is a Concord joke that Erin does not know is true.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
