import type { CarYear } from "../car-year.page-type.ts"

export const subaruForesterHybrid2026 = {
  id: "019e4af8-3811-74dc-99ef-4e230436330e",
  pageTypeSlug: "car-year",
  slug: "subaru-forester-hybrid-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Carry-over with revised pricing. Same 2.5L BOXER + hybrid powertrain (194 hp combined), Symmetrical AWD via CVT, ~35 mpg combined, ~581 mi total range. Four trims: Premium ($36,180 incl. $1,450 destination), Sport, Limited ($38,995), Touring ($41,545) [https://media.subaru.com/newsrelease.do?id=2424]. Pricing adjusted slightly versus MY2025 for affordability positioning. A new Forester Sport Onyx Edition special trim is added on the gas Forester side (not the Hybrid). No federal new-vehicle tax credit (expired 9/30/2025) and as an HEV it would not have qualified for the 30D credit anyway.",
  shortList: false,
  sources:
    "- https://media.subaru.com/newsrelease.do?id=2424\n- https://www.subaru.com/vehicles/forester/hybrid/2026.html\n- https://www.subaru.com/vehicles/forester/hybrid/2026/specs-trim.html\n- https://cars.usnews.com/cars-trucks/subaru/forester-hybrid",
  exclusionReason: "All trims excluded",
  carModelSlug: "subaru-forester-hybrid",
} as const satisfies CarYear
