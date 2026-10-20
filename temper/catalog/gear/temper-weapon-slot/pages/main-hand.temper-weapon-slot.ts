import type { TemperWeaponSlot } from "akasha/temper/catalog/gear/temper-weapon-slot/temper-weapon-slot.page-type.types.ts"

export const mainHand = {
  id: "019e4caa-eefe-736a-951c-8396a8dcc8d4",
  type: "page-type/temper-weapon-slot",
  slug: "main-hand",
  title: "Main Hand",
  key: "main-hand",
  icon: "https://esoicons.uesp.net/esoui/art/characterwindow/gearslot_mainhand.png",
  displayOrder: 0,

  slotEquipType: "temper-equip-type/main-hand",
  createdAt: "2026-05-21T22:32:11.262Z",
  updatedAt: "2026-10-20T11:47:05.518Z",
} as const satisfies TemperWeaponSlot
