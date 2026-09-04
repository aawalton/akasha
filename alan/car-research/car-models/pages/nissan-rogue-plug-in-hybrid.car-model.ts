import type { CarModel } from "../car-model.page-type.ts"

export const nissanRoguePlugInHybrid = {
  id: "019e4af2-3be8-7ca3-9398-3c3108e71d35",
  pageTypeSlug: "car-model",
  slug: "nissan-rogue-plug-in-hybrid",
  title: "Rogue Plug-in Hybrid",
  bodyStyle: "suv",
  generation: "1st gen Rogue PHEV (T33-based, rebadged Mitsubishi Outlander PHEV platform)",
  modelYearsAvailable: "2026",
  overview:
    "The 2026 Nissan Rogue Plug-in Hybrid is Nissan's first plug-in hybrid offered in the US market, marking the brand's entry into the hybrid market. It is platform-derived from the Mitsubishi Outlander PHEV (Alliance synergy) and shares its powertrain — a 2.4L four-cylinder paired with two electric motors and a 20-kWh lithium-ion battery, producing combined 248 hp and 332 lb-ft of torque with standard AWD. The Rogue PHEV is the only PHEV in its class to offer three rows of seating (7-passenger capacity), with 38 miles of EPA-estimated electric range and 420 miles of total range. Sold alongside the gasoline-only standard Rogue. Source: https://usa.nissannews.com/en-US/releases/2026-nissan-rogue-plug-in-hybrid-press-kit ; https://www.nissanusa.com/vehicles/crossovers-suvs/rogue-plug-in-hybrid.html",
  powertrainOptions: ["PHEV"],
  segment: "compact",
  shortList: false,
  sources:
    "- Nissan USA Rogue PHEV: https://www.nissanusa.com/vehicles/crossovers-suvs/rogue-plug-in-hybrid/specs-trims.html\n- 2026 Rogue PHEV press kit: https://usa.nissannews.com/en-US/releases/2026-nissan-rogue-plug-in-hybrid-press-kit\n- 2026 Rogue PHEV pricing: https://usa.nissannews.com/en-US/releases/2026-nissan-rogue-plug-in-hybrid-pricing-starts-at-45990\n- Edmunds 2026 Rogue PHEV: https://www.edmunds.com/nissan/rogue-plug-in-hybrid/\n- U.S. News first drive: https://cars.usnews.com/cars-trucks/advice/2026-nissan-rogue-phev-first-drive\n- Cars.com specs: https://www.cars.com/research/nissan-rogue_plug_in_hybrid-2026/specs/",
  exclusionReason: "All years excluded",
  carMakeSlug: "nissan",
} as const satisfies CarModel
