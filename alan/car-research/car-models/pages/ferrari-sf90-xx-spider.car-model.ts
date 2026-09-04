import type { CarModel } from "../car-model.page-type.ts"

export const ferrariSf90XxSpider = {
  id: "019e4ada-c9e7-764e-bfd1-04404dba6af0",
  pageTypeSlug: "car-model",
  slug: "ferrari-sf90-xx-spider",
  title: "SF90 XX Spider",
  bodyStyle: "convertible",
  generation: "F173 (SF90 family) - XX derivative",
  modelYearsAvailable: "2025",
  overview:
    "Open-top variant of the SF90 XX Stradale; revealed June 2023, limited to 599 units (allocations sold out). Same 1,030 hp combined PHEV powertrain. Carbon-bodied retractable hardtop and fixed rear wing retained. Final production year MY2025. Sources: https://en.wikipedia.org/wiki/Ferrari_SF90_Stradale, https://www.hagerty.com/valuation-tools/ferrari/sf90_xx_spider/2025/2025-ferrari-sf90_xx_spider",
  powertrainOptions: ["PHEV"],
  segment: "exotic",
  shortList: false,
  sources:
    "- https://en.wikipedia.org/wiki/Ferrari_SF90_Stradale\n- https://www.hagerty.com/valuation-tools/ferrari/sf90_xx_spider/2025/2025-ferrari-sf90_xx_spider",
  exclusionReason: "All years excluded",
  carMakeSlug: "ferrari",
} as const satisfies CarModel
