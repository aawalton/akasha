import type { TemperArmorWeight } from "akasha/temper/catalog/gear/temper-armor-weight/temper-armor-weight.page-type.types.ts"

export const light = {
  id: "01a05fd5-4dd1-7e9f-a6a2-228e81841b09",
  type: "page-type/temper-armor-weight",
  slug: "light",
  title: "Light",
  key: "light",
  baseValue: 174.5,
  isStandard: true,
  skillLineId: "temper-skill-line/armor-light-armor",
  craftedGlyphItemId: 26582,
  hashPlace: 1,
  armorType: 1,
  levelSlope: 2,
  levelIntercept: 28.5,
  createdAt: "2026-09-02T01:56:49.745Z",
  updatedAt: "2026-09-27T04:15:45.000Z",
} as const satisfies TemperArmorWeight
