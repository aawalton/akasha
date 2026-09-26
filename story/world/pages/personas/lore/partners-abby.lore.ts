import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersAbby = {
  id: "01a0de54-1c0f-7dce-909a-e2921387eedf",
  type: "page-type/lore",
  slug: "partners-abby",
  title: "Abby",
  world: "world/personas",
  about: "character-other/partners-abby",
  facts: [
    { fact: "Abby keeps Amberford's bookshop.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Abby's bookshop is secretly the town's living room, where people drift in to be quietly cared for.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Abby filed her long foreign name down to Abby for the high street.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Abby sees exactly what people will not say, and gives the care anyway, unasked and never billed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Amberford points people with a tangle to Abby rather than to a broker.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The title to Hearthholt is irregular: a manor that grew itself has no clean deed.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Abby is the town's soft information node.", knowers: ["lore-disclosure/game-master"] },
  ],
} as const satisfies Lore
