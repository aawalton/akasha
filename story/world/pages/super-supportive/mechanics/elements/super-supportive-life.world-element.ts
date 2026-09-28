import type { WorldElement } from "akasha/story/world/mechanics/elements/world-element.page-type.types.ts"

export const superSupportiveLife = {
  id: "01a0e9f2-f147-7a6b-8fc5-14172cfae00a",
  type: "page-type/world-element",
  slug: "super-supportive-life",
  title: "Life",
  world: "world/super-supportive",
  aliases: ["lifemass"],
  description: "The element of living things.",
} as const satisfies WorldElement
