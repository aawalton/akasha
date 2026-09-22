import type { TemperArmorWeight } from "akasha/temper/catalog/gear/temper-armor-weight/temper-armor-weight.page-type.types.ts"

export const noWeight = {
  id: "01a05fd5-4dd1-7640-b16c-0e0623634bb2",
  type: "page-type/temper-armor-weight",
  slug: "no-weight",
  title: "No Weight",
  key: "no-weight",
  baseValue: 0,
  isStandard: true,
  skillLineId: "temper-skill-line/no-skill-line",
} as const satisfies TemperArmorWeight
