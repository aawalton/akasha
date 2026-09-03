import type { CarModel } from "../car-model.page-type.ts"

export const hyundaiIoniq5 = {
  id: "019e4ae0-e3d1-7879-9b4a-4e72ccdc724d",
  pageTypeSlug: "car-model",
  slug: "hyundai-ioniq-5",
  title: "Ioniq 5",
  bodyStyle: "crossover",
  generation: "1st gen (NE, E-GMP platform); 2024 facelift / 2025 US-built MY refresh",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Ioniq 5 is Hyundai's flagship compact electric crossover, launched globally in 2021 on the dedicated E-GMP 800V platform. It targets the Tesla Model Y, VW ID.4, and Ford Mustang Mach-E. The 2025 US model year was the first built at the Hyundai Metaplant America in Georgia (HMGMA), which restored its eligibility for the full $7,500 federal EV tax credit and added native NACS as the standard charge port. The 2026 model year delivered substantial price cuts ($7,600 off the base trim) and a six-trim lineup: SE Standard Range, SE, SEL, XRT, Limited, and N. The XRT trim is a more rugged-styled variant. Known for its 800V architecture enabling 10-80% DC fast charging in ~18 minutes (on CCS), Vehicle-to-Load (V2L) outlets, and a flat-floor lounge-style interior. Sources: https://www.hyundaiusa.com/us/en/vehicles/ioniq-5 ; https://insideevs.com/news/758478/2025-hyundai-ioniq-5-tax-credit/",
  powertrainOptions: ["BEV"],
  segment: "compact",
  shortList: true,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/ioniq-5\n- https://www.hyundaiusa.com/us/en/vehicles/ioniq-5/compare-specs\n- https://insideevs.com/news/758478/2025-hyundai-ioniq-5-tax-credit/\n- https://electrek.co/2025/05/04/its-back-hyundai-ioniq-5-qualifies-for-7500-tax-credit-again/",
  carMakeSlug: "hyundai",
} as const satisfies CarModel
