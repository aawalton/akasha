import type { CarModel } from "../car-model.page-type.ts"

export const hyundaiKonaElectric = {
  id: "019e4ae1-7979-7178-9c55-41f259951440",
  pageTypeSlug: "car-model",
  slug: "hyundai-kona-electric",
  title: "Kona Electric",
  bodyStyle: "crossover",
  generation: "2nd gen (SX2 EV)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Kona Electric is Hyundai's subcompact battery-electric crossover, a distinct model from the gasoline/hybrid Kona. The 2nd-generation Kona Electric launched in late 2023 (MY2024) on the same SX2 platform as the ICE Kona, with a 400V architecture (not E-GMP 800V). 2025 US lineup: SE, SEL, N Line, Limited, with a 48.6 kWh standard-range battery (133 hp, 200 mi) on SE and 64.8 kWh long-range (201 hp, 261 mi) on SEL/N Line/Limited. For 2026, Hyundai cut the lineup to a single SE Standard Range trim (133 hp, 200 mi, ~$32,975) as inventory clears. CCS1 port on both years. Sources: https://www.hyundaiusa.com/us/en/vehicles/kona-electric ; https://www.edmunds.com/hyundai/kona-electric/",
  powertrainOptions: ["BEV"],
  segment: "subcompact",
  shortList: true,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/kona-electric\n- https://www.hyundaiusa.com/us/en/vehicles/kona-electric/compare-specs\n- https://www.edmunds.com/hyundai/kona-electric/",
  carMakeSlug: "hyundai",
} as const satisfies CarModel
