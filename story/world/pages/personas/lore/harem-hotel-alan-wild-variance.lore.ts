import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const haremHotelAlanWildVariance = {
  id: "01a0de50-ff5f-77ee-b2eb-a4d20d85d140",
  type: "page-type/lore",
  slug: "harem-hotel-alan-wild-variance",
  title: "Wild Variance",
  world: "world/personas",
  about: "harem-hotel-trait/harem-hotel-alan-wild-variance",
  loreDisclosure: "lore-disclosure/player",
  facts: [
    "Fate runs swingy for Alan.",
    "Alan plays the variance rather than hiding from it.",
    "Alan's fortunes have high ceilings and real floors.",
  ],
} as const satisfies Lore
