import type { TemperJewelrySlot } from "akasha/temper/catalog/gear/temper-jewelry-slot/temper-jewelry-slot.page-type.types.ts"

export const necklace = {
  id: "019e4cb1-de14-788e-a4db-0abd7e4e4887",
  type: "page-type/temper-jewelry-slot",
  slug: "necklace",
  title: "Necklace",
  key: "necklace",
  icon: "/resources/gearslot_neck.png",
  displayOrder: 0,
  jewelryType: "temper-jewelry-type/necklace",
} as const satisfies TemperJewelrySlot
