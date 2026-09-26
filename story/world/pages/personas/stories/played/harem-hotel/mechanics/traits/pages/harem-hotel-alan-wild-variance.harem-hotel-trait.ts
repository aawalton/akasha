import type { HaremHotelTrait } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/traits/harem-hotel-trait.page-type.types.ts"

export const haremHotelAlanWildVariance = {
  id: "01a0de50-ff60-7b4a-9290-7aeeebaeb300",
  type: "page-type/harem-hotel-trait",
  slug: "harem-hotel-alan-wild-variance",
  title: "Wild Variance",
  story: "story-played/harem-hotel",
  character: "character-player/harem-hotel-alan",
  description: "Alan throws one twenty-sided die rather than two ten-sided dice.",
} as const satisfies HaremHotelTrait
