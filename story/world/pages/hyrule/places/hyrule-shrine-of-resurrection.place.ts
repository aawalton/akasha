import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const hyruleShrineOfResurrection = {
  id: "01a10330-06d7-715f-8242-d196bd538188",
  type: "page-type/place",
  slug: "hyrule-shrine-of-resurrection",
  title: "Shrine of Resurrection",
  world: "world/hyrule",
  within: "place/hyrule-great-plateau",
  facts: [],
} as const satisfies Place
