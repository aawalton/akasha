import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersErin = {
  id: "01a0de54-1c10-72c1-b58b-561225906baf",
  type: "page-type/lore",
  slug: "partners-erin",
  title: "Erin",
  world: "world/personas",
  about: "character-other/partners-erin",
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
