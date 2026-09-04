import type { CarModel } from "../car-model.page-type.ts"

export const hyundaiTucsonHybrid = {
  id: "019e4ae1-961d-73e3-94bf-7097cbb75b19",
  pageTypeSlug: "car-model",
  slug: "hyundai-tucson-hybrid",
  title: "Tucson Hybrid",
  bodyStyle: "suv",
  generation: "4th gen (NX4) hybrid; 2025 mid-cycle refresh",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Tucson Hybrid is Hyundai's compact hybrid SUV — Hyundai's best-selling vehicle in the US — using a 1.6L turbocharged inline-4 paired with a 47.7 kW electric motor and 1.49 kWh battery for combined output of 231 hp / 271 lb-ft. AWD is standard on the hybrid. The 2025 model year received a styling and interior refresh including a new twin 12.3-inch dashboard display layout. The 2026 model year adds a new Blue SE entry trim (~$32,200) for 38/38/38 mpg, alongside SEL Convenience and Limited. Sources: https://www.hyundaiusa.com/us/en/vehicles/tucson-hybrid ; https://www.hyundaiusa.com/us/en/vehicles/tucson-hybrid/compare-specs",
  powertrainOptions: ["HEV"],
  segment: "compact",
  shortList: false,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/tucson-hybrid\n- https://www.hyundaiusa.com/us/en/vehicles/tucson-hybrid/compare-specs\n- https://www.edmunds.com/hyundai/tucson/2026/hybrid/",
  exclusionReason: "All years excluded",
  carMakeSlug: "hyundai",
} as const satisfies CarModel
