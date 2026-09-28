import type { WorldElement } from "akasha/story/world/mechanics/elements/world-element.page-type.types.ts"

export const superSupportiveSky = {
  id: "01a0e9f2-f147-755f-9536-fe791a0b4e7c",
  type: "page-type/world-element",
  slug: "super-supportive-sky",
  title: "Sky",
  world: "world/super-supportive",
  description: "The element of air and weather.",
} as const satisfies WorldElement
