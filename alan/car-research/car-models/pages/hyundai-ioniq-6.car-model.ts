import type { CarModel } from "../car-model.page-type.ts"

export const hyundaiIoniq6 = {
  id: "019e4ae1-2cd6-763c-af29-fcb9e05dd682",
  pageTypeSlug: "car-model",
  slug: "hyundai-ioniq-6",
  title: "Ioniq 6",
  bodyStyle: "sedan",
  generation: "1st gen (CE, E-GMP platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Ioniq 6 is Hyundai's midsize electric streamliner sedan on the E-GMP 800V platform, launched as a 2023 model. Its 0.22 drag coefficient is one of the lowest in production, enabling a class-leading EPA range up to 361 mi (SE long-range RWD). The 2025 lineup spans SE Standard Range, SE, SEL, and Limited; RWD standard, AWD optional on SEL/Limited. A facelifted 2026 Ioniq 6 with native NACS was announced for late-2025/early-2026 US arrival. Targets the Tesla Model 3 and Polestar 2. Sources: https://www.hyundaiusa.com/us/en/vehicles/ioniq-6 ; https://www.edmunds.com/hyundai/ioniq-6/",
  powertrainOptions: ["BEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/ioniq-6\n- https://www.hyundaiusa.com/us/en/vehicles/ioniq-6/compare-specs\n- https://www.edmunds.com/hyundai/ioniq-6/",
  exclusionReason: "All years excluded",
  carMakeSlug: "hyundai",
} as const satisfies CarModel
