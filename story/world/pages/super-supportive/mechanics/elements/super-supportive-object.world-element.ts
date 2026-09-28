import type { WorldElement } from "akasha/story/world/mechanics/elements/world-element.page-type.types.ts"

export const superSupportiveObject = {
  id: "01a0e9f2-f147-7dea-817e-8a363620d388",
  type: "page-type/world-element",
  slug: "super-supportive-object",
  title: "Object",
  world: "world/super-supportive",
  description: "The element of crafted things.",
} as const satisfies WorldElement
