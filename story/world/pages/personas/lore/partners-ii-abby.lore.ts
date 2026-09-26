import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersIiAbby = {
  id: "01a0de51-2d5e-760f-b194-9b58034f64c8",
  type: "page-type/lore",
  slug: "partners-ii-abby",
  title: "Abby",
  world: "world/personas",
  about: "character-other/partners-ii-abby",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "Abby keeps Amberford's bookshop.",
    "Abby's bookshop is the town's living room, where people drift in to be quietly cared for.",
    "Abby filed her long foreign name down to Abby for the high street.",
    "Abby sees what people will not say and gives the care anyway, unasked and never billed.",
    "Amberford brings its tangles to Abby rather than to a broker.",
    "Hearthholt's deed is irregular, since a manor that grew itself has no clean title.",
    "Abby is Amberford's soft information node.",
  ],
} as const satisfies Lore
