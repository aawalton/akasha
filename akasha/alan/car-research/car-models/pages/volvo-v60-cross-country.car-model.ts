import type { CarModel } from "../car-model.page-type.ts"

export const volvoV60CrossCountry = {
  id: "019e4afd-71c2-7666-b623-f96a1126adc5",
  pageTypeSlug: "car-model",
  slug: "volvo-v60-cross-country",
  title: "V60 Cross Country",
  bodyStyle: "wagon",
  generation: "2nd gen V60 (SPA platform, 2018–present)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The V60 Cross Country is Volvo's lifted-wagon — the standard V60 sedan-wagon with extra ground clearance (~7.9 in), AWD-standard, and rugged exterior cladding for buyers who want a Subaru Outback feel in a Swedish luxury package. After a brief 2023 hiatus the V60 Cross Country returned to the US lineup for MY2024 and continues through 2025/2026. Sold only with the B5 48V mild-hybrid powertrain (247 hp, AWD, 8-speed automatic). The standard non-Cross-Country V60 has been retired from the US — Cross Country is the only V60 you can buy new. Sources: https://www.volvocars.com/us/cars/v60-cross-country/, https://www.edmunds.com/volvo/v60-cross-country/, https://www.mclaughlinvolvocars.com/volvo-v60-trim-options.htm",
  powertrainOptions: ["MHEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- https://www.volvocars.com/us/cars/v60-cross-country/\n- https://www.edmunds.com/volvo/v60-cross-country/",
  exclusionReason: "All years excluded",
  carMakeSlug: "volvo",
} as const satisfies CarModel
