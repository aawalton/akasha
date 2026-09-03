import type { CarModel } from "../car-model.page-type.ts"

export const mercedesBenzGlcPlugInHybrid = {
  id: "019e4af0-c48f-75c5-9617-974c1f54b45c",
  pageTypeSlug: "car-model",
  slug: "mercedes-benz-glc-plug-in-hybrid",
  title: "GLC Plug-in Hybrid",
  bodyStyle: "suv",
  generation: "2nd gen (X254)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The GLC 350e is the plug-in hybrid variant of Mercedes-Benz's compact luxury SUV, combining a 2.0L turbocharged inline-4 with a 134-hp electric motor and 24.8 kWh battery for 313 hp / 406 lb-ft combined system output. Delivers 54 mi EPA-estimated all-electric range — best in its segment. 11 kW AC and 60 kW DC fast-charging capability (PHEVs with DC fast-charge are rare). Standard 4MATIC AWD with 9-speed automatic. 0-60 in 6.3 sec. AMG GLC 63 S E PERFORMANCE is the high-performance PHEV variant with ~671 hp. Sources: https://www.mbusa.com/en/vehicles/model/glc/suv/glc350e4 ; https://www.greencarreports.com/news/1142652_2025-mercedes-glc-350e-phev-fast-charging-electric-range",
  powertrainOptions: ["PHEV"],
  segment: "luxury-compact",
  shortList: false,
  sources:
    "- https://www.mbusa.com/en/vehicles/model/glc/suv/glc350e4\n- https://www.greencarreports.com/news/1142652_2025-mercedes-glc-350e-phev-fast-charging-electric-range\n- https://www.edmunds.com/mercedes-benz/glc/2026/plug-in-hybrid/",
  exclusionReason: "All years excluded",
  carMakeSlug: "mercedes-benz",
} as const satisfies CarModel
