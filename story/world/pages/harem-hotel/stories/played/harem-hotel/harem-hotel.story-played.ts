import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const haremHotel = {
  id: "01a0e821-409c-74fe-bc03-72077ca039cb",
  type: "page-type/story-played",
  slug: "harem-hotel",
  title: "Harem Hotel",
  world: "world/harem-hotel",
  domain: "domain/harem-hotel-explicitness",
  unit: "unit/words",
  chapterBreak: "A floor's task is met and its stairs open.",
} as const satisfies StoryPlayed
