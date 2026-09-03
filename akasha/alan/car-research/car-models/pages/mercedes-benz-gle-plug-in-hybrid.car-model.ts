import type { CarModel } from "../car-model.page-type.ts"

export const mercedesBenzGlePlugInHybrid = {
  id: "019e4af0-de39-7726-a4c1-73745203997a",
  pageTypeSlug: "car-model",
  slug: "mercedes-benz-gle-plug-in-hybrid",
  title: "GLE Plug-in Hybrid",
  bodyStyle: "suv",
  generation: "4th gen (W167 facelift)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The GLE 450e 4MATIC is the plug-in hybrid variant of the midsize GLE-Class SUV. Combines a 2.0L turbocharged inline-4 with a 134-hp electric motor and 23.3 kWh usable / 31.2 kWh gross battery for 381 hp combined system output. 49 mi EPA-estimated all-electric range. Standard AWD, 9-speed automatic, DC fast-charge capable to ~60 kW. Sources: https://www.mbusa.com/en/vehicles/model/gle/suv/gle450e4 ; https://www.edmunds.com/mercedes-benz/gle/2026/plug-in-hybrid/",
  powertrainOptions: ["PHEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- https://www.mbusa.com/en/vehicles/model/gle/suv/gle450e4\n- https://www.edmunds.com/mercedes-benz/gle/2026/plug-in-hybrid/",
  exclusionReason: "All years excluded",
  carMakeSlug: "mercedes-benz",
} as const satisfies CarModel
