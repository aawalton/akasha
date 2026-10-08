import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const spellWeaving = {
  id: "01a0e108-307d-74ad-b258-b029f192e280",
  type: "page-type/temper-potion",
  slug: "spell-weaving",
  title: "Spell Weaving",
  key: "spell-weaving",
  itemId: 54858,
  restores: ["temper-metric/magicka-restore"],
  createdAt: "2026-09-27T04:03:25.437Z",
  updatedAt: "2026-09-27T04:03:29.000Z",
} as const satisfies TemperPotion
