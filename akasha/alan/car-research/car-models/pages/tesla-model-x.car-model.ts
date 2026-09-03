import type { CarModel } from "../car-model.page-type.ts"

export const teslaModelX = {
  id: "019e4af8-105c-7591-ada8-ee09960ec00b",
  pageTypeSlug: "car-model",
  slug: "tesla-model-x",
  title: "Model X",
  bodyStyle: "suv",
  generation: "1st gen (2021 refresh, falcon-wing doors)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Tesla Model X is Tesla's luxury 3-row electric SUV with signature falcon-wing rear passenger doors, in production since 2015. The 2021 refresh aligned its interior with the Model S (horizontal touchscreen, yoke-optional wheel, AMD Ryzen). Two trims for MY2025/2026: Long Range AWD ($99,990, 670hp, 352mi range, 3.8s 0-60) and Plaid ($114,990, 1,020hp, 335mi range, 2.5s 0-60, tri-motor). Standard 5-seat, optional 6-seat (+$6,500) and 7-seat (+$3,500) configurations. Falcon-wing doors and gimmicky display dance/light shows make this a polarizing premium product. In January 2026 Tesla announced MY2026 will be the final model year for Model X alongside Model S, with production ending Q2 2026. Sources: https://cars.usnews.com/cars-trucks/tesla/model-x , https://www.edmunds.com/tesla/model-x/ , https://en.wikipedia.org/wiki/Tesla_Model_X",
  powertrainOptions: ["BEV"],
  segment: "luxury-full-size",
  shortList: false,
  sources:
    "- https://cars.usnews.com/cars-trucks/tesla/model-x\n- https://www.edmunds.com/tesla/model-x/\n- https://en.wikipedia.org/wiki/Tesla_Model_X\n- https://www.edmunds.com/tesla/model-x/2026/features-specs/\n- https://www.kbb.com/tesla/model-x/2026/specs/",
  exclusionReason: "All years excluded",
  carMakeSlug: "tesla",
} as const satisfies CarModel
