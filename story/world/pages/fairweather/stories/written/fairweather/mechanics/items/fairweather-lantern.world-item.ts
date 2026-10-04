import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const fairweatherLantern = {
  id: "01a1061a-f6df-7d48-ae39-db88a967c16a",
  type: "page-type/world-item",
  slug: "fairweather-lantern",
  title: "Lantern",
  world: "world/fairweather",
  description:
    "A tin hand lantern with a glass chimney and a ring to carry it by, burning lamp oil.",
} as const satisfies WorldItem
