import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersErin = {
  id: "01a0de54-1c10-72c1-b58b-561225906baf",
  type: "page-type/lore",
  slug: "partners-erin",
  title: "Erin",
  world: "world/personas",
  about: "character-other/partners-erin",
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
