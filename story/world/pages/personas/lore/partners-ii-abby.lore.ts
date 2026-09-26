import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersIiAbby = {
  id: "01a0de51-2d5e-760f-b194-9b58034f64c8",
  type: "page-type/lore",
  slug: "partners-ii-abby",
  title: "Abby",
  world: "world/personas",
  about: "character-other/partners-ii-abby",
  facts: [
    { fact: "Abby keeps Amberford's bookshop.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Abby's bookshop is the town's living room, where people drift in to be quietly cared for.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Abby filed her long foreign name down to Abby for the high street.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Abby sees what people will not say and gives the care anyway, unasked and never billed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Amberford brings its tangles to Abby rather than to a broker.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hearthholt's deed is irregular, since a manor that grew itself has no clean title.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Abby is Amberford's soft information node.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
