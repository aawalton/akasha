import type { CarYear } from "../car-year.page-type.ts"

export const ferrariSf90Stradale2025 = {
  id: "019e4adb-b2d4-7ef3-b4b0-80cbdac6fb99",
  pageTypeSlug: "car-year",
  slug: "ferrari-sf90-stradale-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Final production MY for the base SF90 Stradale. Carryover hardware vs MY2024. 8 mi EPA electric range, 51 MPGe in EV mode, 18 MPG combined ICE per fueleconomy.gov. Sources: https://www.fueleconomy.gov/feg/PowerSearch.do?action=noform&path=7&year=2024&make=Ferrari&model=SF90+Stradale&srchtyp=ymm, https://autos.yahoo.com/ferrari-sf90-stradale-production-ends-183000700.html",
  shortList: false,
  sources:
    "- https://www.fueleconomy.gov/feg/PowerSearch.do?action=noform&path=7&year=2024&make=Ferrari&model=SF90+Stradale&srchtyp=ymm\n- https://autos.yahoo.com/ferrari-sf90-stradale-production-ends-183000700.html\n- https://en.wikipedia.org/wiki/Ferrari_SF90_Stradale",
  exclusionReason: "All trims excluded",
  carModelSlug: "ferrari-sf90-stradale",
} as const satisfies CarYear
