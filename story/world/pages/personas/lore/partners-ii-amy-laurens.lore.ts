import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersIiAmyLaurens = {
  id: "01a0de0a-0345-7f9b-bbb2-74233556883a",
  type: "page-type/lore",
  slug: "partners-ii-amy-laurens",
  title: "Amy Laurens",
  world: "world/personas",
  about: "character-other/partners-ii-amy",
  loreDisclosure: "lore-disclosure/player",
  facts: [
    "Amy Laurens has kept Hearthholt's affairs a good many years.",
    "Amy came up to Hearthholt from Amberford.",
    "Amy climbed to Hearthholt the evening Alan arrived, with a lantern and a supper basket.",
    "Amy says she packed the basket before she had any notion whom she would meet.",
    "Amy introduced herself at Hearthholt's gate and asked whom she was feeding.",
    "Alan had not yet spoken to Amy when she asked at the gate.",
  ],
} as const satisfies Lore
