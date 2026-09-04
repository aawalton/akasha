import type { CarModel } from "../car-model.page-type.ts"

export const volvoXc60 = {
  id: "019e4afd-1259-7a08-8904-cdc1e599f761",
  pageTypeSlug: "car-model",
  slug: "volvo-xc60",
  title: "XC60",
  bodyStyle: "suv",
  generation: "2nd gen (SPA platform, 2017–present; mid-cycle refresh for MY2026)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The XC60 is Volvo's best-selling model globally and the centerpiece of the US lineup now that the sedans are gone. Compact-luxury SUV on the SPA platform, available in two powertrains: B5 / B6 48V mild-hybrid (247–295 hp) and T8 plug-in hybrid (455 hp, ~35 mi EPA electric range). For MY2025 Volvo dropped the 'Recharge' badge — the PHEV is now just XC60 T8. MY2026 brings a substantial mid-cycle refresh: revised exterior, new interior, new 11.2-inch portrait center display running Volvo Car UX with Google Built-in. Trims: Core, Plus, Ultra (each available with B5 mild-hybrid or T8 plug-in hybrid), plus a top-spec T8 Polestar Engineered. Sources: https://www.volvocars.com/us/cars/xc60-hybrid/, https://www.edmunds.com/volvo/xc60/2026/plug-in-hybrid/, https://www.greencars.com/expert-insights/2026-volvo-xc60-t8-plug-in-peace",
  powertrainOptions: ["PHEV", "MHEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- https://www.volvocars.com/us/cars/xc60-hybrid/\n- https://www.edmunds.com/volvo/xc60/2026/plug-in-hybrid/\n- https://www.edmunds.com/volvo/xc60/2025/",
  exclusionReason: "All years excluded",
  carMakeSlug: "volvo",
} as const satisfies CarModel
