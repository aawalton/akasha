import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const fairweatherMoonbell = {
  id: "01a10326-1ad8-7d53-a848-da344923ca26",
  type: "page-type/world-item",
  slug: "fairweather-moonbell",
  title: "Moonbell",
  world: "world/fairweather",
  description:
    "A small blue bell-shaped flower from the Glasswood's hollows, open only between dusk and midnight, steeped cold for fever draughts.",
  createdAt: "2026-10-03T19:03:11.320Z",
  updatedAt: "2026-10-03T19:03:14.000Z",
} as const satisfies WorldItem
