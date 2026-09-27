import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const crownMagickaPotion = {
  id: "01a0e108-307d-7520-967f-7cf3510ec1a5",
  type: "page-type/temper-potion",
  slug: "crown-magicka-potion",
  title: "Crown Magicka Potion",
  key: "crown-magicka-potion",
  itemId: 61030,
  restores: ["temper-metric/magicka-restore"],
} as const satisfies TemperPotion
