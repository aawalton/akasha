import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const glowingCyanTincture = {
  id: "01a0e108-307d-7c0f-9d55-c6402af29770",
  type: "page-type/temper-potion",
  slug: "glowing-cyan-tincture",
  title: "Glowing Cyan Tincture",
  key: "glowing-cyan-tincture",
  itemId: 68351,
  restores: ["temper-metric/magicka-restore"],
} as const satisfies TemperPotion
