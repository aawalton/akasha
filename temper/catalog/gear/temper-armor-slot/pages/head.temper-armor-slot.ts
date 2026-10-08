import type { TemperArmorSlot } from "akasha/temper/catalog/gear/temper-armor-slot/temper-armor-slot.page-type.types.ts"

export const head = {
  id: "01a05fd4-d96d-706f-9d80-32f481500169",
  type: "page-type/temper-armor-slot",
  slug: "head",
  title: "Head",
  key: "head",
  icon: "/resources/gearslot_head.png",
  displayOrder: 0,
  hashPlace: 0,

  slotEquipType: "temper-equip-type/head",
  createdAt: "2026-09-02T01:56:19.949Z",
  updatedAt: "2026-09-27T04:24:42.000Z",
} as const satisfies TemperArmorSlot
