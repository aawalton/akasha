import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const fairweatherBangVial = {
  id: "01a10326-1ad8-706f-9d8e-f8ade6697bec",
  type: "page-type/world-item",
  slug: "fairweather-bang-vial",
  title: "Bang Vial",
  world: "world/fairweather",
  description:
    "A small corked glass vial of Tilly's brewing that bursts when thrown, in a flash of green fire and a loud bang.",
} as const satisfies WorldItem
