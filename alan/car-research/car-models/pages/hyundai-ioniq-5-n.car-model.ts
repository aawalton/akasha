import type { CarModel } from "../car-model.page-type.ts"

export const hyundaiIoniq5N = {
  id: "019e4ae1-0e16-76ef-9e36-2ab2afc8598d",
  pageTypeSlug: "car-model",
  slug: "hyundai-ioniq-5-n",
  title: "Ioniq 5 N",
  bodyStyle: "crossover",
  generation: "1st gen (NE) N-performance variant",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Ioniq 5 N is Hyundai's first dedicated electric N-performance vehicle, built on the same E-GMP 800V platform as the standard Ioniq 5 but with dual high-output motors producing 601 hp (641 hp with N Grin Boost), upgraded brakes, suspension, and chassis bracing. It features simulated N e-Shift gear shifts and N Active Sound to provide an engaged driving experience, plus track-focused N Battery Preconditioning and N Race modes. The 2025 model year retained the CCS1 port; the 2026 model year adopts native NACS. Widely praised by enthusiast outlets (MotorTrend Performance Vehicle of the Year 2024). Sources: https://www.hyundaiusa.com/us/en/vehicles/ioniq-5-n ; https://www.caranddriver.com/hyundai/ioniq-5-n",
  powertrainOptions: ["BEV"],
  segment: "sports",
  shortList: false,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/ioniq-5-n\n- https://www.hyundaiusa.com/us/en/vehicles/ioniq-5-n/compare-specs\n- https://www.caranddriver.com/hyundai/ioniq-5-n",
  exclusionReason: "All years excluded",
  carMakeSlug: "hyundai",
} as const satisfies CarModel
