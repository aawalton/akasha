import type { CarModel } from "../car-model.page-type.ts"

export const kiaSportageHybrid = {
  id: "019e4aea-b0be-7a27-9050-65594a4b5371",
  pageTypeSlug: "car-model",
  slug: "kia-sportage-hybrid",
  title: "Sportage Hybrid",
  bodyStyle: "suv",
  generation: "5th gen (NQ5); 1.6L turbocharged + electric motor parallel hybrid",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Sportage Hybrid is Kia's compact-SUV hybrid, sharing the 5th-gen Sportage body with the gas-only and PHEV variants. The hybrid uses a turbocharged 1.6L gasoline four plus a single electric motor in a 6-speed automatic transmission, total ~227 hp / ~232 hp (MY2026). MY2025 had three trims (LX, EX, SX Prestige). MY2026 expands to five trims with new S and X-Line — plus a styling refresh (LED headlights, restyled bumpers, 12.3-inch infotainment standard). Source: https://www.kia.com/us/en/sportage-hybrid , https://www.cargurus.com/Cars/articles/2026-kia-sportage-hybrid-plug-in-price-specs-release-date",
  powertrainOptions: ["HEV"],
  segment: "compact",
  shortList: false,
  sources:
    "https://www.kia.com/us/en/sportage-hybrid\nhttps://www.kia.com/us/en/sportage-hybrid/specs-compare\nhttps://www.kbb.com/kia/sportage-hybrid/2025/\nhttps://www.edmunds.com/kia/sportage-hybrid/2025/",
  exclusionReason: "All years excluded",
  carMakeSlug: "kia",
} as const satisfies CarModel
