import type { TemperArmorSlot } from "akasha/temper/catalog/gear/temper-armor-slot/temper-armor-slot.page-type.types.ts"

export const feet = {
  id: "01a05fd4-d96d-7048-bcad-e8ae001ada43",
  type: "page-type/temper-armor-slot",
  slug: "feet",
  title: "Feet",
  key: "feet",
  icon: "https://esoicons.uesp.net/esoui/art/characterwindow/gearslot_feet.png",
  displayOrder: 6,
  hashPlace: 6,

  slotEquipType: "temper-equip-type/feet",
  createdAt: "2026-09-02T01:56:19.949Z",
  updatedAt: "2026-10-20T11:47:05.518Z",
} as const satisfies TemperArmorSlot
