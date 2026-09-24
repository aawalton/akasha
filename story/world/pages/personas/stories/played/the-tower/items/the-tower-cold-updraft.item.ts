import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerColdUpdraft = {
  id: "01a0d444-4297-7670-9f69-51cf91c32899",
  type: "page-type/item",
  slug: "the-tower-cold-updraft",
  title: "The cold updraft",
  story: "story-played/the-tower",
  place: "place/the-tower-shaft-base-flights",
  description: "A cold updraft rising out of the shaft's depths, carrying sound and scent upward.",
} as const satisfies Item
