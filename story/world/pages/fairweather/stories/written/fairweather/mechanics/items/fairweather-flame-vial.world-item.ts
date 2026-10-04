import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const fairweatherFlameVial = {
  id: "01a10619-671e-76a9-acc0-0af2a2d20c51",
  type: "page-type/world-item",
  slug: "fairweather-flame-vial",
  title: "Flame Vial",
  world: "world/fairweather",
  description:
    "A small corked glass vial that bursts into fire when thrown, the flame running along whatever it lands on.",
} as const satisfies WorldItem
