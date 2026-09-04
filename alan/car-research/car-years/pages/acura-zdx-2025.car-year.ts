import type { CarYear } from "../car-year.page-type.ts"

export const acuraZdx2025 = {
  id: "019e4ad5-d49d-7c45-a007-21636922696b",
  pageTypeSlug: "car-year",
  slug: "acura-zdx-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "The 2025 ZDX is essentially carryover from the 2024 launch year. Acura had originally planned to skip the 2025 MY, but a 2025 MY was produced. Production ended September 2025 with no 2026 MY. Pricing for 2025 ranged from ~$64,500 (A-Spec RWD) to ~$73,500-$75,000 (Type S). Acura-approved NACS-CCS DC fast-charging adapter became available June 2025, giving ZDX owners access to 23,500+ Tesla Superchargers. Sources: https://en.wikipedia.org/wiki/Acura_ZDX , https://acuranews.com/en-US/releases/release-ccb19723f8c4bc9d353bc56a2c0ee138-acura-zdx-owners-now-have-access-to-tesla-supercharger-network-with-approved-adapters",
  shortList: false,
  sources:
    "1. https://www.acura.com/suvs/zdx/pricing-and-specs\n2. https://cars.usnews.com/cars-trucks/acura/zdx\n3. https://www.acuraofwichita.com/the-acura-zdx-is-discontinued-what-that-means-for-drivers/",
  exclusionReason: "All trims excluded",
  carModelSlug: "acura-zdx",
} as const satisfies CarYear
