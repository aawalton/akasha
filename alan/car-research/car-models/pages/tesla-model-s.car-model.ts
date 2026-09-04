import type { CarModel } from "../car-model.page-type.ts"

export const teslaModelS = {
  id: "019e4af7-ef70-76fc-8960-c3d0d36e8b9d",
  pageTypeSlug: "car-model",
  slug: "tesla-model-s",
  title: "Model S",
  bodyStyle: "sedan",
  generation: "2nd gen (2021 refresh, 'Plaid' platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Tesla Model S is Tesla's flagship luxury electric sedan, in production since 2012 — the car that established Tesla as a credible automaker. The 2021 refresh introduced the tri-motor 'Plaid' powertrain (1,020hp, 2.0s 0-60), the controversial yoke steering (later made optional, with a traditional round wheel as standard since 2023), new front fascia, redesigned interior with horizontal touchscreen, gear selector moved to touchscreen/auto-detect, AMD Ryzen infotainment. Two trims for MY2025/2026: Long Range AWD ($86,630, 670hp, 410mi range, 3.1s 0-60) and Plaid ($101,630, 1,020hp, 368mi range, 2.0s 0-60). In January 2026 Tesla announced MY2026 will be the final model year for Model S, with production ending Q2 2026. Sources: https://cars.usnews.com/cars-trucks/tesla/model-s , https://www.kbb.com/tesla/model-s/2026/specs/ , https://www.edmunds.com/tesla/model-s/2025/features-specs/",
  powertrainOptions: ["BEV"],
  segment: "luxury-full-size",
  shortList: false,
  sources:
    "- https://cars.usnews.com/cars-trucks/tesla/model-s\n- https://www.kbb.com/tesla/model-s/2026/specs/\n- https://www.edmunds.com/tesla/model-s/2025/features-specs/\n- https://www.evspecifications.com/en/model/d1e23e6\n- https://ev-database.org/car/1405/Tesla-Model-S-Plaid",
  exclusionReason: "All years excluded",
  carMakeSlug: "tesla",
} as const satisfies CarModel
