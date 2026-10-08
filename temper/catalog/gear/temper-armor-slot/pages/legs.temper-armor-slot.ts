import type { TemperArmorSlot } from "akasha/temper/catalog/gear/temper-armor-slot/temper-armor-slot.page-type.types.ts"

export const legs = {
  id: "01a05fd4-d96e-76d6-b252-9d484c92f69e",
  type: "page-type/temper-armor-slot",
  slug: "legs",
  title: "Legs",
  key: "legs",
  icon: "/resources/gearslot_legs.png",
  displayOrder: 5,
  hashPlace: 5,

  slotEquipType: "temper-equip-type/legs",
  createdAt: "2026-09-02T01:56:19.950Z",
  updatedAt: "2026-09-27T04:24:42.000Z",
} as const satisfies TemperArmorSlot
