import type { CarModel } from "../car-model.page-type.ts"

export const mercedesBenzSClassPlugInHybrid = {
  id: "019e4af0-fcd1-78ca-8e3c-bc5fe6d7131d",
  pageTypeSlug: "car-model",
  slug: "mercedes-benz-s-class-plug-in-hybrid",
  title: "S-Class Plug-in Hybrid",
  bodyStyle: "sedan",
  generation: "7th gen (W223)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The S 580e 4MATIC is the plug-in hybrid variant of the flagship S-Class sedan. Combines a 3.0L turbocharged inline-6 with a 148-hp permanent magnet synchronous motor integrated into the 9-speed automatic for 503 hp / 553 lb-ft combined. 28 kWh usable battery delivers 48 mi EPA all-electric range. AC charging in 2.75 hours (0-100%); optional DC fast-charging 10-80% in 20 min. AMG S 63 E PERFORMANCE is the ultra-high-performance PHEV variant with twin-turbo V8 + e-motor for 791 hp / 1,055 lb-ft, 0-60 in 3.3 sec. Sources: https://www.mbusa.com/en/vehicles/model/s-class/sedan/s580ev4 ; https://www.edmunds.com/mercedes-benz/s-class/2025/plug-in-hybrid/",
  powertrainOptions: ["PHEV"],
  segment: "luxury-full-size",
  shortList: false,
  sources:
    "- https://www.mbusa.com/en/vehicles/model/s-class/sedan/s580ev4\n- https://www.edmunds.com/mercedes-benz/s-class/2025/plug-in-hybrid/\n- https://www.edmunds.com/mercedes-benz/s-class/2026/plug-in-hybrid/",
  exclusionReason: "All years excluded",
  carMakeSlug: "mercedes-benz",
} as const satisfies CarModel
