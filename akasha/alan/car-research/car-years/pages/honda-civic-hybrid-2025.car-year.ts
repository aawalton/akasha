import type { CarYear } from "../car-year.page-type.ts"

export const hondaCivicHybrid2025 = {
  id: "019e4ae1-db39-7a06-a23e-47a9c7f3183f",
  pageTypeSlug: "car-year",
  slug: "honda-civic-hybrid-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "First year of the reintroduced US Civic Hybrid as part of the 11th-gen Civic mid-cycle refresh. Lineup: Sport Hybrid and Sport Touring Hybrid in both sedan and hatchback body styles. Two-motor e:HEV system (2.0L Atkinson-cycle I4 + two motors, 200 hp / 232 lb-ft combined). EPA: 50/47/49 mpg city/hwy/combined (sedan Sport Hybrid) and 50/45/48 (hatchback). Honda Sensing safety suite standard. Wireless Apple CarPlay and Android Auto standard. Sport Touring trim adds 9-inch touchscreen with Google built-in, heated leather seats, Bose audio.\n\nSources:\n- https://www.edmunds.com/honda/civic/2025/hybrid/\n- https://www.kbb.com/honda/civic-hybrid/2025/specs/",
  shortList: false,
  sources:
    "- https://www.edmunds.com/honda/civic/2025/hybrid/\n- https://www.kbb.com/honda/civic-hybrid/2025/\n- https://www.kbb.com/honda/civic-hybrid/2025/specs/",
  exclusionReason: "All trims excluded",
  carModelSlug: "honda-civic-hybrid",
} as const satisfies CarYear
