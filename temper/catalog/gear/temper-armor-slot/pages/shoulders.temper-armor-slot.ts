import type { TemperArmorSlot } from "akasha/temper/catalog/gear/temper-armor-slot/temper-armor-slot.page-type.types.ts"

export const shoulders = {
  id: "01a05fd4-d96e-7990-aa6d-647ac22169f4",
  type: "page-type/temper-armor-slot",
  slug: "shoulders",
  title: "Shoulders",
  key: "shoulders",
  icon: "https://esoicons.uesp.net/esoui/art/characterwindow/gearslot_shoulders.png",
  displayOrder: 1,
  hashPlace: 1,

  slotEquipType: "temper-equip-type/shoulders",
  createdAt: "2026-09-02T01:56:19.950Z",
  updatedAt: "2026-10-20T11:47:05.518Z",
} as const satisfies TemperArmorSlot
