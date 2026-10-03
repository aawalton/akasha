import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const hyruleMountHylia = {
  id: "01a10330-06d7-766a-be0d-f948b80e9622",
  type: "page-type/place",
  slug: "hyrule-mount-hylia",
  title: "Mount Hylia",
  world: "world/hyrule",
  within: "place/hyrule-great-plateau",
  facts: [],
} as const satisfies Place
