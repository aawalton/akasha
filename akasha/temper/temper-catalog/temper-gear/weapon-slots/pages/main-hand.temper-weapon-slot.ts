import type { TemperWeaponSlot } from "../temper-weapon-slot.page-type.ts"

export const mainHand = {
  id: "01a05fd5-2055-7928-b52a-dcc4c108f560",
  pageTypeSlug: "temper-weapon-slot",
  slug: "main-hand",
  title: "Main Hand",
  key: "main-hand",
  icon: "/resources/gearslot_mainhand.png",
  displayOrder: 0,
} as const satisfies TemperWeaponSlot
