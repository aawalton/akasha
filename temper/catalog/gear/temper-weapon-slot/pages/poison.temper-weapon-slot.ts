import type { TemperWeaponSlot } from "akasha/temper/catalog/gear/temper-weapon-slot/temper-weapon-slot.page-type.types.ts"

export const poison = {
  id: "019e4caa-ef02-779e-b5ad-800828d05231",
  type: "page-type/temper-weapon-slot",
  slug: "poison",
  title: "Poison",
  key: "poison",
  displayOrder: 2,

  slotEquipType: "temper-equip-type/poison",
  createdAt: "2026-05-21T22:32:11.266Z",
  updatedAt: "2026-09-27T04:24:42.000Z",
} as const satisfies TemperWeaponSlot
