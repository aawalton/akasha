import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersIiAmyKept = {
  id: "01a0de51-2d5f-7d8e-a824-d3894968edf0",
  type: "page-type/lore",
  slug: "partners-ii-amy-kept",
  title: "Amy's Talent",
  world: "world/personas",
  about: "character-other/partners-ii-amy",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "Amy's Talent is Kept.",
    "Hearthholt's keys left Amy's locked drawer at dusk, the moment Alan arrived in Aravel.",
    "Amy packed supper before she knew whom she would meet, which was Kept's first firing.",
    "Amy does not know what that firing means.",
  ],
} as const satisfies Lore
