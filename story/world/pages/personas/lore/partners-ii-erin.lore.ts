import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersIiErin = {
  id: "01a0de51-2d5f-7752-93e4-ab35e6f987fc",
  type: "page-type/lore",
  slug: "partners-ii-erin",
  title: "Erin",
  world: "world/personas",
  about: "character-other/partners-ii-erin",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "Erin keeps The Wandering Door, the inn on Amberford's square.",
    "Erin is broad and quick to laugh.",
    "Erin remembers every face and what they drank.",
    "Erin is a Hearth-sister who knows a home-shaped soul on sight.",
    "The Wandering Door's sign is a door attached to no wall.",
    "The sign is a Concord joke that Erin does not know is true.",
  ],
} as const satisfies Lore
