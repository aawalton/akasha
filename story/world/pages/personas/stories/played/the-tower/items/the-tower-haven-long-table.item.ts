import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerHavenLongTable = {
  id: "01a0d444-fd10-7e72-ad22-a9b84bab9e82",
  type: "page-type/item",
  slug: "the-tower-haven-long-table",
  title: "The long laid table",
  story: "story-played/the-tower",
  place: "place/the-tower-haven-threshold",
  description:
    "A long table of bare boards dressed in a woven meal, with old bones heaped beneath its cloth.",
} as const satisfies Item
