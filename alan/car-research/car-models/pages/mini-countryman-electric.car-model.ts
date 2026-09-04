import type { CarModel } from "../car-model.page-type.ts"

export const miniCountrymanElectric = {
  id: "019e4af1-aeca-76bd-87f4-d7e08af70bdf",
  pageTypeSlug: "car-model",
  slug: "mini-countryman-electric",
  title: "Countryman Electric",
  bodyStyle: "suv",
  generation: "3rd gen (U25, BMW UKL platform)",
  modelYearsAvailable: "2025",
  overview:
    "The Countryman Electric (officially 'Countryman SE ALL4') is MINI's only all-electric vehicle sold new in the US for MY2025/MY2026 — the redesigned J01 Cooper Electric was delayed indefinitely because its planned production was tariff-trapped in China, and no UK-built replacement has been announced. The U25 Countryman is built in Leipzig, Germany on BMW's UKL platform (shared with the BMW iX1/iX2), sharing virtually all hardware and software with those vehicles. The SE ALL4 designation denotes the dual-motor 308-hp BEV variant; gas siblings are S ALL4 (turbo I4) and JCW ALL4 (high-output turbo I4) and are out of scope here. Subcompact-luxury-crossover positioning, 175 in long, 5-passenger, 66.5 kWh gross battery. The third-generation Countryman launched in MY2025 (fall 2024 deliveries); MINI USA explicitly stated the SE ALL4 would 'remain as Model Year 2025' through the 2026 calendar year — no MY2026 SE ALL4 was sold. The MY2027 SE ALL4 began production in March 2026 with the same trim structure and base pricing. Sources: https://insideevs.com/news/729369/2025-mini-countryman-se-all4-pricing-specs-overview/ ; https://www.press.bmwgroup.com/usa/article/detail/T0450606EN_US/model-year-2026-mini-lineup-pricing-and-equipment-updates ; https://www.miniusa.com/model/electric-vehicles/countryman.html",
  powertrainOptions: ["BEV"],
  segment: "luxury-compact",
  shortList: true,
  sources:
    "- MINI USA Countryman Electric: https://www.miniusa.com/model/electric-vehicles/countryman.html\n- BMW Group press (MY2026 MINI lineup, SE ALL4 carryover note): https://www.press.bmwgroup.com/usa/article/detail/T0450606EN_US/model-year-2026-mini-lineup-pricing-and-equipment-updates\n- InsideEVs (MY2025 pricing/specs): https://insideevs.com/news/729369/2025-mini-countryman-se-all4-pricing-specs-overview/\n- Consumer Reports first drive: https://www.consumerreports.org/cars/hybrids-evs/2025-mini-countryman-se-review-a1124603539/\n- IIHS 2025 Countryman: https://www.iihs.org/ratings/vehicle/mini/countryman-4-door-suv/2025",
  carMakeSlug: "mini",
} as const satisfies CarModel
