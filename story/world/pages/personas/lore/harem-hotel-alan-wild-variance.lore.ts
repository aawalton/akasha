import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const haremHotelAlanWildVariance = {
  id: "01a0de50-ff5f-77ee-b2eb-a4d20d85d140",
  type: "page-type/lore",
  slug: "harem-hotel-alan-wild-variance",
  title: "Wild Variance",
  world: "world/personas",
  about: "harem-hotel-trait/harem-hotel-alan-wild-variance",
  facts: [
    {
      fact: "Fate runs swingy for Alan.",
      knowers: ["lore-disclosure/game-master", "character-player/harem-hotel-alan"],
    },
    {
      fact: "Alan plays the variance rather than hiding from it.",
      knowers: ["lore-disclosure/game-master", "character-player/harem-hotel-alan"],
    },
    {
      fact: "Alan's fortunes have high ceilings and real floors.",
      knowers: ["lore-disclosure/game-master", "character-player/harem-hotel-alan"],
    },
  ],
} as const satisfies Lore
