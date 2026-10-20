import type { TemperArmorSlot } from "akasha/temper/catalog/gear/temper-armor-slot/temper-armor-slot.page-type.types.ts"

export const chest = {
  id: "01a05fd4-d96c-7a66-b933-92bd5b7622c8",
  type: "page-type/temper-armor-slot",
  slug: "chest",
  title: "Chest",
  key: "chest",
  icon: "https://esoicons.uesp.net/esoui/art/characterwindow/gearslot_chest.png",
  displayOrder: 2,
  hashPlace: 2,

  slotEquipType: "temper-equip-type/chest",
  createdAt: "2026-09-02T01:56:19.948Z",
  updatedAt: "2026-10-20T11:47:05.518Z",
} as const satisfies TemperArmorSlot
