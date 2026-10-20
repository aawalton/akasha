import type { TemperWeaponSlot } from "akasha/temper/catalog/gear/temper-weapon-slot/temper-weapon-slot.page-type.types.ts"

export const offHand = {
  id: "019e4caa-ef00-77d7-a5a0-f03b034f2845",
  type: "page-type/temper-weapon-slot",
  slug: "off-hand",
  title: "Off Hand",
  key: "off-hand",
  icon: "https://esoicons.uesp.net/esoui/art/characterwindow/gearslot_offhand.png",
  displayOrder: 1,

  slotEquipType: "temper-equip-type/off-hand",
  createdAt: "2026-05-21T22:32:11.264Z",
  updatedAt: "2026-10-20T11:47:05.518Z",
} as const satisfies TemperWeaponSlot
