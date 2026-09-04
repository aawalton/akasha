import type { CarModel } from "../car-model.page-type.ts"

export const hyundaiTucsonPlugInHybrid = {
  id: "019e4ae1-b0e0-79f4-a91f-462031182f78",
  pageTypeSlug: "car-model",
  slug: "hyundai-tucson-plug-in-hybrid",
  title: "Tucson Plug-in Hybrid",
  bodyStyle: "suv",
  generation: "4th gen (NX4) PHEV",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Tucson Plug-in Hybrid is Hyundai's compact PHEV SUV, using the same 1.6L turbo + e-motor as the Tucson Hybrid but with a 13.8 kWh battery enabling 32 mi EPA electric-only range and a total range of ~420 mi. Total system output 268 hp / 271 lb-ft, AWD standard. Two trims for 2025/2026: SEL and Limited. The 2026 PHEV is priced at $41,925 (SEL) to $50,150 (Limited). Federal EV tax credit eligibility ended Sept 30, 2025; for 2025 PHEVs sold before that date, $7,500 was available. Sources: https://www.hyundaiusa.com/us/en/vehicles/tucson-plug-in-hybrid ; https://www.edmunds.com/hyundai/tucson-plug-in-hybrid/",
  powertrainOptions: ["PHEV"],
  segment: "compact",
  shortList: false,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/tucson-plug-in-hybrid\n- https://www.hyundaiusa.com/us/en/vehicles/tucson-plug-in-hybrid/compare-specs\n- https://www.kbb.com/hyundai/tucson-plug-in-hybrid/",
  exclusionReason: "All years excluded",
  carMakeSlug: "hyundai",
} as const satisfies CarModel
