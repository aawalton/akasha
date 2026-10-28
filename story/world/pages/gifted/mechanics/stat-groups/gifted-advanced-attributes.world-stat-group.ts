import type { WorldStatGroup } from "akasha/story/world/mechanics/stat-groups/world-stat-group.page-type.types.ts"

export const giftedAdvancedAttributes = {
  id: "01a18300-6758-74c7-844c-65c5053c0b8e",
  type: "page-type/world-stat-group",
  slug: "gifted-advanced-attributes",
  title: "Advanced Attribute",
  pluralTitle: "Advanced Attributes",
  world: "world/gifted",
  statSlots: 2,
  displayOrder: 2,
  createdAt: "2026-10-28T14:53:24.183Z",
  updatedAt: "2026-10-28T16:18:13.147Z",
} as const satisfies WorldStatGroup
