import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const haremHotelAriaSilverDragon = {
  id: "01a0de52-6ee4-7ecf-8a35-f50945cd7e8e",
  type: "page-type/lore",
  slug: "harem-hotel-aria-silver-dragon",
  title: "Aria, Silver Dragon",
  world: "world/personas",
  about: "character-other/harem-hotel-aria",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "Aria is a silver dragon in human form.",
    "Aria is ancient.",
    "Aria is sensual the way silver dragons are romantic.",
  ],
} as const satisfies Lore
