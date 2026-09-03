import type { CarModel } from "../car-model.page-type.ts"

export const hondaPrologue = {
  id: "019e4ae0-990e-7b6c-b12a-bde8bc919122",
  pageTypeSlug: "car-model",
  slug: "honda-prologue",
  title: "Prologue",
  bodyStyle: "suv",
  generation: "1st gen (GM Ultium / BEV3 platform, shared with Chevy Blazer EV / Acura ZDX)",
  modelYearsAvailable: "2024, 2025, 2026",
  overview:
    "The Honda Prologue is Honda's first volume battery-electric SUV in the US market, co-developed with General Motors on GM's Ultium / BEV3 platform and built alongside the Chevrolet Blazer EV at GM's Ramos Arizpe (Mexico) plant. Launched in MY2024, it serves as Honda's bridge BEV ahead of the Honda 0 Series in 2026+. The Prologue is a midsize 5-passenger crossover positioned against the Tesla Model Y, Ford Mustang Mach-E, and Hyundai Ioniq 5. For MY2025 Honda lifted EPA range to as high as 308 mi (FWD) via a software-tuning refresh that came at no MSRP increase. For MY2026 Honda quietly cut MSRP across the board by $7,500, partly offsetting the September-30-2025 sunset of the federal EV tax credit. The Prologue uses an 85 kWh GM/LG NMC pack with CCS1 fast-charge port (peaks ~150-155 kW); Tesla Supercharger access added June 2025 via a $225 Honda-branded CCS1-to-NACS adapter.\n\nSources:\n- https://en.wikipedia.org/wiki/Honda_Prologue\n- https://hondanews.com/en-US/honda-automobiles/releases/release-28556cec8c60d45354dbdd1404014728-building-on-success-2025-honda-prologue-goes-farther\n- https://www.autoevolution.com/news/2026-honda-prologue-quietly-receives-7500-price-cut-268331.html",
  powertrainOptions: ["BEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "- https://automobiles.honda.com/prologue\n- https://hondanews.com/en-US/honda-automobiles/releases/release-8fa536ee8b843d5cf766c58616009076-2026-honda-prologue-pricing-and-epa-ratings\n- https://www.edmunds.com/honda/prologue/\n- https://en.wikipedia.org/wiki/Honda_Prologue",
  exclusionReason: "All years excluded",
  carMakeSlug: "honda",
} as const satisfies CarModel
