import type { WorldStatGroup } from "akasha/story/world/mechanics/stat-groups/world-stat-group.page-type.types.ts"

export const giftedAffinities = {
  id: "01a18300-6758-7050-b40f-80076bca1fc6",
  type: "page-type/world-stat-group",
  slug: "gifted-affinities",
  title: "Affinity",
  pluralTitle: "Affinities",
  world: "world/gifted",
  displayOrder: 3,
  createdAt: "2026-10-28T14:53:24.183Z",
  updatedAt: "2026-10-28T16:18:13.147Z",
} as const satisfies WorldStatGroup
