import type { TemperArmorSlot } from "akasha/temper/catalog/gear/temper-armor-slot/temper-armor-slot.page-type.types.ts"

export const hands = {
  id: "01a05fd4-d96d-7959-b20d-dfda8b43bc6b",
  type: "page-type/temper-armor-slot",
  slug: "hands",
  title: "Hands",
  key: "hands",
  icon: "https://esoicons.uesp.net/esoui/art/characterwindow/gearslot_hands.png",
  displayOrder: 3,
  hashPlace: 3,

  slotEquipType: "temper-equip-type/hands",
  createdAt: "2026-09-02T01:56:19.949Z",
  updatedAt: "2026-10-20T11:47:05.518Z",
} as const satisfies TemperArmorSlot
