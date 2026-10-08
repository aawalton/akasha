import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const crownMagickaPotion = {
  id: "01a0e108-307d-7520-967f-7cf3510ec1a5",
  type: "page-type/temper-potion",
  slug: "crown-magicka-potion",
  title: "Crown Magicka Potion",
  key: "crown-magicka-potion",
  itemId: 61030,
  restores: ["temper-metric/magicka-restore"],
  createdAt: "2026-09-27T04:03:25.437Z",
  updatedAt: "2026-09-27T04:03:29.000Z",
} as const satisfies TemperPotion
