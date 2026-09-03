import type { CarModel } from "../car-model.page-type.ts"

export const kiaSportagePlugInHybrid = {
  id: "019e4aeb-c0d7-7959-9658-f18f0834677b",
  pageTypeSlug: "car-model",
  slug: "kia-sportage-plug-in-hybrid",
  title: "Sportage Plug-in Hybrid",
  bodyStyle: "suv",
  generation: "5th gen (NQ5); 1.6L turbo + 13.8 kWh battery PHEV",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Sportage Plug-in Hybrid pairs the 1.6L turbocharged engine with a more powerful electric motor and a 13.8 kWh battery for ~34 mi EPA all-electric range. Standard AWD. Two trims (X-Line, X-Line Prestige) for both MY2025 and MY2026. MY2026 nudges combined output to 268 hp (up from 261), retains the 34 mi EV range, and adopts a refreshed front lighting design. Source: https://www.kia.com/us/en/sportage-plug-in-hybrid , https://www.cars.com/research/kia-sportage_plug_in_hybrid-2025/",
  powertrainOptions: ["PHEV"],
  segment: "compact",
  shortList: false,
  sources:
    "https://www.kia.com/us/en/sportage-plug-in-hybrid\nhttps://www.kia.com/us/en/sportage-plug-in-hybrid/specs-compare\nhttps://www.kiamedia.com/us/en/models/sportage-phev/2025/specifications\nhttps://www.cars.com/research/kia-sportage_plug_in_hybrid-2025/",
  exclusionReason: "All years excluded",
  carMakeSlug: "kia",
} as const satisfies CarModel
