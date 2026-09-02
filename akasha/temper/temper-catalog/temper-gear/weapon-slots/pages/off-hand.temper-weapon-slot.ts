import type { TemperWeaponSlot } from "../temper-weapon-slot.page-type.ts"

export const offHand = {
  id: "01a05fd5-2055-77d8-95f1-ddc0caa843f6",
  pageTypeSlug: "temper-weapon-slot",
  slug: "off-hand",
  title: "Off Hand",
  key: "off-hand",
  icon: "/resources/gearslot_offhand.png",
  displayOrder: 1,
} as const satisfies TemperWeaponSlot
