import type { TemperWeaponSlot } from "../temper-weapon-slot.page-type.ts"

export const offHand = {
  id: "019e4caa-ef00-77d7-a5a0-f03b034f2845",
  pageTypeSlug: "temper-weapon-slot",
  slug: "off-hand",
  title: "Off Hand",
  key: "off-hand",
  icon: "/resources/gearslot_offhand.png",
  displayOrder: 1,
} as const satisfies TemperWeaponSlot
