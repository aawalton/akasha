import type { WorldAbilityKind } from "akasha/story/world/mechanics/ability-kinds/world-ability-kind.page-type.types.ts"

export const giftedTrialWorldSkill = {
  id: "01a18d10-93f1-70ee-be73-fee0c8469693",
  type: "page-type/world-ability-kind",
  slug: "gifted-trial-world-skill",
  title: "Skill",
  pluralTitle: "Skills",
  world: "world/gifted-trial-world",
  description: "An imprint of a spell, held in one of a soul's Skill slots.",
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies WorldAbilityKind
