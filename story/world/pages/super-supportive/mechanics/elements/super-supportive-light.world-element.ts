import type { WorldElement } from "akasha/story/world/mechanics/elements/world-element.page-type.types.ts"

export const superSupportiveLight = {
  id: "01a0e9f2-f147-7d62-8ed5-16d3f98f54bb",
  type: "page-type/world-element",
  slug: "super-supportive-light",
  title: "Light",
  world: "world/super-supportive",
  description: "The element of light.",
} as const satisfies WorldElement
