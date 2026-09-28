import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const haremHotel = {
  id: "01a0e821-409c-74fe-bc03-72077ca039cb",
  type: "page-type/story-played",
  slug: "harem-hotel",
  title: "Harem Hotel",
  world: "world/harem-hotel",
  domain: "domain/harem-hotel-explicitness",
  unit: "unit/words",
  externalId: "harem-hotel",
  coordinatorAgent: "mari-game-master-harem-hotel",
  chapterBreak: "A floor's task is met and its stairs open.",
  panels: [
    "played-panel/player-character",
    "played-panel/other-characters",
    "played-panel/scene-cover",
    "played-panel/quest-list",
  ],
} as const satisfies StoryPlayed
