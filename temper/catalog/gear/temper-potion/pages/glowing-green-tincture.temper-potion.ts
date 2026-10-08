import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const glowingGreenTincture = {
  id: "01a0e108-307d-7490-b5a8-a2076565dbfd",
  type: "page-type/temper-potion",
  slug: "glowing-green-tincture",
  title: "Glowing Green Tincture",
  key: "glowing-green-tincture",
  itemId: 68352,
  restores: ["temper-metric/stamina-restore"],
  createdAt: "2026-09-27T04:03:25.437Z",
  updatedAt: "2026-09-27T04:03:29.000Z",
} as const satisfies TemperPotion
