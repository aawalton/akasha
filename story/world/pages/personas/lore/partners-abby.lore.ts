import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersAbby = {
  id: "01a0de54-1c0f-7dce-909a-e2921387eedf",
  type: "page-type/lore",
  slug: "partners-abby",
  title: "Abby",
  world: "world/personas",
  about: "character-other/partners-abby",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "Abby keeps Amberford's bookshop.",
    "Abby's bookshop is secretly the town's living room, where people drift in to be quietly cared for.",
    "Abby filed her long foreign name down to Abby for the high street.",
    "Abby sees exactly what people will not say, and gives the care anyway, unasked and never billed.",
    "Amberford points people with a tangle to Abby rather than to a broker.",
    "The title to Hearthholt is irregular: a manor that grew itself has no clean deed.",
    "Abby is the town's soft information node.",
  ],
} as const satisfies Lore
