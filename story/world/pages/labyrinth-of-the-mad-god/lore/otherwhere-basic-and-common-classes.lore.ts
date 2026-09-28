import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereBasicAndCommonClasses = {
  id: "01a0e9d4-c3d9-75c9-af60-fe115e2fb0c3",
  type: "page-type/lore",
  slug: "otherwhere-basic-and-common-classes",
  title: "Basic and Common Classes",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The child class is a neutral pathway every person holds from birth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Survivor is a Basic class that levels fast and swells health, stamina and mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Survivor grants the skills Size Up and Foraging, capped at 10.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Elemental Archer is a Common class with a smoke arrow and an electric arrow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An Elemental Archer's damage stays low until they find a modified bow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Common classes suit support fighters until a better class arrives at level 25.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
