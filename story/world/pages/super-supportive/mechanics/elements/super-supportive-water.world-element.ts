import type { WorldElement } from "akasha/story/world/mechanics/elements/world-element.page-type.types.ts"

export const superSupportiveWater = {
  id: "01a0e9f2-f147-77d1-878a-ddf322c66ed4",
  type: "page-type/world-element",
  slug: "super-supportive-water",
  title: "Water",
  world: "world/super-supportive",
  aliases: ["elemental water"],
  description: "The element of water.",
  createdAt: "2026-09-28T21:36:47.943Z",
  updatedAt: "2026-09-28T21:36:51.000Z",
} as const satisfies WorldElement
