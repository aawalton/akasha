import type { WorldAbilityKind } from "akasha/story/world/mechanics/ability-kinds/world-ability-kind.page-type.types.ts"

export const giftedPolishWorldSkill = {
  id: "01a18e17-127d-77a0-a12f-436d5cb89b00",
  type: "page-type/world-ability-kind",
  slug: "gifted-polish-world-skill",
  title: "Skill",
  pluralTitle: "Skills",
  world: "world/gifted-polish-world",
  description: "An imprint of a spell, held in one of a soul's Skill slots.",
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:34:02.178Z",
} as const satisfies WorldAbilityKind
