import type { CarYear } from "../car-year.page-type.ts"

export const hondaAccordHybrid2025 = {
  id: "019e4ae2-1c4b-7a22-b5d9-4486c02d1256",
  pageTypeSlug: "car-year",
  slug: "honda-accord-hybrid-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "MY2025 added standard 15-watt wireless charging pad across all Accord Hybrid trims; Touring trim gained a standard heated steering wheel. Four hybrid trims: Sport Hybrid ($33,655), EX-L Hybrid ($34,940), Sport-L Hybrid ($35,375), and Touring Hybrid. Powertrain unchanged: 2.0L Atkinson e:HEV, 204 hp / 247 lb-ft. EX-L variant — with smaller 17-inch wheels and lower-rolling-resistance tires — leads EPA at 51/44/48 mpg city/hwy/combined; Sport/Sport-L/Touring on 19-inch wheels rate 46/41/44.\n\nSources:\n- https://www.edmunds.com/honda/accord/2025/hybrid/\n- https://www.kbb.com/honda/accord-hybrid/2025/specs/",
  shortList: false,
  sources:
    "- https://www.edmunds.com/honda/accord/2025/hybrid/\n- https://www.kbb.com/honda/accord-hybrid/2025/specs/\n- https://automobiles.honda.com/tools/build-and-price-trimwalk?modelseries=accord-sedan&modelyear=2025",
  exclusionReason: "All trims excluded",
  carModelSlug: "honda-accord-hybrid",
} as const satisfies CarYear
