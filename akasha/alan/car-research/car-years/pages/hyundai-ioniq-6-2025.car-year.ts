import type { CarYear } from "../car-year.page-type.ts"

export const hyundaiIoniq62025 = {
  id: "019e4ae2-cb5e-7f5b-ab22-765b7fa9a708",
  pageTypeSlug: "car-year",
  slug: "hyundai-ioniq-6-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Mid-cycle refresh with new front-end and interior updates. Retained CCS1 port. Federal EV tax credit eligibility restored mid-2025 when battery sourcing met FEOC rules. Sources: https://www.hyundaiusa.com/us/en/vehicles/ioniq-6",
  shortList: false,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/ioniq-6\n- https://www.edmunds.com/hyundai/ioniq-6/",
  exclusionReason: "All trims excluded",
  carModelSlug: "hyundai-ioniq-6",
} as const satisfies CarYear
