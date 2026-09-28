import type { HaremHotelFloor } from "akasha/story/world/pages/harem-hotel/stories/written/harem-hotel/mechanics/floors/harem-hotel-floor.page-type.types.ts"

export const haremHotelFloor1 = {
  id: "01a0e849-11fb-7418-bf14-d7fb36ef2402",
  type: "page-type/harem-hotel-floor",
  slug: "harem-hotel-floor-1",
  title: "Floor 1: The Lobby",
  world: "world/harem-hotel",
  character: "character-player/harem-hotel-alan",
  objective:
    "To check in, make the concierge come and make the bellhop come, then come inside one of them, his choice. When that is done, the gate to the stairs opens.",
  status: "complete",
} as const satisfies HaremHotelFloor
