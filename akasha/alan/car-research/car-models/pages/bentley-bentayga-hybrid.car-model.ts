import type { CarModel } from "../car-model.page-type.ts"

export const bentleyBentaygaHybrid = {
  id: "019e4ad6-a173-7544-a821-a7152035acce",
  pageTypeSlug: "car-model",
  slug: "bentley-bentayga-hybrid",
  title: "Bentayga Hybrid",
  bodyStyle: "suv",
  generation: "1st gen facelift (Typ 4V, 2021+ refresh)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "Bentley's full-size luxury SUV in plug-in hybrid form. Pairs a 3.0L turbocharged V6 with a 126 hp electric motor and an ~18 kWh (gross) / ~13 kWh (usable) lithium-ion battery for ~18-25 mi of EV range. Combined output ~456 hp and ~516-700 Nm depending on calibration. Available in the US in base, Azure (comfort-focused) and S (sport-styled) trims; the V8 ICE-only variants are tracked separately and excluded here. Bentley confirmed in 2024 that an all-new Bentayga generation arrives in 2028 as a PHEV (not BEV as previously planned), extending the current model's PHEV run. Sources: https://www.bentleymotors.com/en/models/bentayga.html ; https://www.carsdirect.com/bentley/bentayga-hybrid ; https://robbreport.com/motors/cars/bentley-bentayga-next-gen-plug-in-hybrid-1237813959/",
  powertrainOptions: ["PHEV"],
  segment: "luxury-full-size",
  shortList: false,
  sources:
    "- https://www.bentleymotors.com/en/models/bentayga.html\n- https://www.cars.com/research/bentley-bentayga_hybrid-2025/\n- https://www.kbb.com/bentley/bentayga/2025/hybrid/\n- https://www.bentleymotors.com/en/models/bentayga/bentayga-azure.html",
  exclusionReason: "All years excluded",
  carMakeSlug: "bentley",
} as const satisfies CarModel
