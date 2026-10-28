import type { WorldAbilityKind } from "akasha/story/world/mechanics/ability-kinds/world-ability-kind.page-type.types.ts"

export const giftedPath = {
  id: "01a17ff2-5710-7210-8bb7-b40c9a472208",
  type: "page-type/world-ability-kind",
  slug: "gifted-path",
  title: "Path",
  pluralTitle: "Paths",
  world: "world/gifted",
  description: "A road a soul walks further with every effort, as the Myriad Paths counts it.",
  createdAt: "2026-10-28T00:39:10.863Z",
  updatedAt: "2026-10-28T00:39:10.863Z",
} as const satisfies WorldAbilityKind
