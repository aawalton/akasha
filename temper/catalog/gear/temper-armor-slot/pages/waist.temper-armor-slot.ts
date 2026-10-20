import type { TemperArmorSlot } from "akasha/temper/catalog/gear/temper-armor-slot/temper-armor-slot.page-type.types.ts"

export const waist = {
  id: "01a05fd4-d96f-73b3-b9fe-4c3996d59a22",
  type: "page-type/temper-armor-slot",
  slug: "waist",
  title: "Waist",
  key: "waist",
  icon: "https://esoicons.uesp.net/esoui/art/characterwindow/gearslot_belt.png",
  displayOrder: 4,
  hashPlace: 4,

  slotEquipType: "temper-equip-type/waist",
  createdAt: "2026-09-02T01:56:19.951Z",
  updatedAt: "2026-10-20T11:47:05.518Z",
} as const satisfies TemperArmorSlot
