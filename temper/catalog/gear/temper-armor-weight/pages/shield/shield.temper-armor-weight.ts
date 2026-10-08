import type { TemperArmorWeight } from "akasha/temper/catalog/gear/temper-armor-weight/temper-armor-weight.page-type.types.ts"

export const shield = {
  id: "01a05fd5-4dd2-7ee6-b974-17ec1acd050b",
  type: "page-type/temper-armor-weight",
  slug: "shield",
  title: "Shield",
  key: "shield",
  baseValue: 1720,
  isStandard: false,
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  hashPlace: 4,
  esoWeaponTypeNumber: 14,
  levelSlope: 20,
  levelIntercept: 260,
  createdAt: "2026-09-02T01:56:49.746Z",
  updatedAt: "2026-09-27T04:15:45.000Z",
} as const satisfies TemperArmorWeight
