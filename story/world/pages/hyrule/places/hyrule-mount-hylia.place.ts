import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const hyruleMountHylia = {
  id: "01a10330-06d7-766a-be0d-f948b80e9622",
  type: "page-type/place",
  slug: "hyrule-mount-hylia",
  title: "Mount Hylia",
  world: "world/hyrule",
  within: "place/hyrule-great-plateau",
  facts: [],
  createdAt: "2026-10-03T19:14:01.559Z",
  updatedAt: "2026-10-03T19:14:04.000Z",
} as const satisfies Place
