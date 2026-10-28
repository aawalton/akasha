import type { WorldAbilityKind } from "akasha/story/world/mechanics/ability-kinds/world-ability-kind.page-type.types.ts"

export const giftedSkill = {
  id: "01a17ff2-5711-7a6e-9669-ff3024037db7",
  type: "page-type/world-ability-kind",
  slug: "gifted-skill",
  title: "Skill",
  pluralTitle: "Skills",
  world: "world/gifted",
  description: "An imprint of a spell, held in one of a soul's Skill slots.",
  createdAt: "2026-10-28T00:39:10.863Z",
  updatedAt: "2026-10-28T00:39:10.863Z",
} as const satisfies WorldAbilityKind
