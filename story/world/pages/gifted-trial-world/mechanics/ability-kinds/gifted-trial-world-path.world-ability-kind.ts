import type { WorldAbilityKind } from "akasha/story/world/mechanics/ability-kinds/world-ability-kind.page-type.types.ts"

export const giftedTrialWorldPath = {
  id: "01a18d10-93f1-7b94-84c8-3bfa72ffb986",
  type: "page-type/world-ability-kind",
  slug: "gifted-trial-world-path",
  title: "Path",
  pluralTitle: "Paths",
  activeSlots: 10,
  world: "world/gifted-trial-world",
  description: "A road a soul walks further with every effort, as the Myriad Paths counts it.",
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies WorldAbilityKind
