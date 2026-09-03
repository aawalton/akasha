import type { CarYear } from "../car-year.page-type.ts"

export const porscheMacanElectric2026 = {
  id: "019e4af7-b790-72cb-9363-b9e65a758321",
  pageTypeSlug: "car-year",
  slug: "porsche-macan-electric-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Carryover from MY25 launch. Minor MSRP increases (~1-3%), additional exterior colors, refined software builds delivered via OTA, NACS adapter compatibility (J3400 accessory) becomes available. Same battery, motors, EPA range. Source: https://www.porsche.com/usa/models/macan/",
  shortList: false,
  sources:
    "- https://www.porsche.com/usa/models/macan/macan-electric-models/\n- https://www.caranddriver.com/porsche/macan-electric",
  exclusionReason: "All trims excluded",
  carModelSlug: "porsche-macan-electric",
} as const satisfies CarYear
