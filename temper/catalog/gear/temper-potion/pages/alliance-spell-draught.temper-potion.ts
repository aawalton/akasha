import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const allianceSpellDraught = {
  id: "01a0e108-307d-78d5-a980-ac785af2464e",
  type: "page-type/temper-potion",
  slug: "alliance-spell-draught",
  title: "Alliance Spell Draught",
  key: "alliance-spell-draught",
  itemId: 71072,
  restores: ["temper-metric/magicka-restore"],
  createdAt: "2026-09-27T04:03:25.437Z",
  updatedAt: "2026-09-27T04:03:29.000Z",
} as const satisfies TemperPotion
