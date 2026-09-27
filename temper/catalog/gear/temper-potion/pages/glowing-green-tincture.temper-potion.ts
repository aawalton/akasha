import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const glowingGreenTincture = {
  id: "01a0e108-307d-7490-b5a8-a2076565dbfd",
  type: "page-type/temper-potion",
  slug: "glowing-green-tincture",
  title: "Glowing Green Tincture",
  key: "glowing-green-tincture",
  itemId: 68352,
  restores: ["temper-metric/stamina-restore"],
} as const satisfies TemperPotion
