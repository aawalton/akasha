import type { CarYear } from "../car-year.page-type.ts"

export const karmaRevero2026 = {
  id: "019e4ae2-b0ab-731d-8f6d-0433c6ef4416",
  pageTypeSlug: "car-year",
  slug: "karma-revero-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Carryover of the 3rd-generation Revero EREV (introduced for MY2025) with no announced powertrain changes. Karma's public statements treat the 2025 and 2026 Reveros as a single 160-unit limited production run; the 2026 model is now available at US Karma dealers. Sources: https://karmaautomotive.com/revero/, https://www.karmawestfield.com/new-inventory/karma-revero.htm",
  shortList: false,
  sources:
    "- https://karmaautomotive.com/revero/\n- https://www.karmawestfield.com/new-inventory/karma-revero.htm\n- https://theevreport.com/karma-revero-3rd-generation-pricing-unveiled",
  exclusionReason: "All trims excluded",
  carModelSlug: "karma-revero",
} as const satisfies CarYear
