import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const cyanTincture = {
  id: "01a0e108-307d-7441-b10c-dc4866ce64dd",
  type: "page-type/temper-potion",
  slug: "cyan-tincture",
  title: "Cyan Tincture",
  key: "cyan-tincture",
  itemId: 68350,
  restores: ["temper-metric/magicka-restore"],
} as const satisfies TemperPotion
