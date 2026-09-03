import type { CarModel } from "../car-model.page-type.ts"

export const volkswagenId4 = {
  id: "019e4afb-f02d-7947-8b03-d57d20908e5f",
  pageTypeSlug: "car-model",
  slug: "volkswagen-id-4",
  title: "ID.4",
  bodyStyle: "suv",
  generation: "1st gen (MEB platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The ID.4 is Volkswagen's mass-market all-electric compact crossover SUV, built on the MEB platform and the brand's first BEV sold in the US. US-market production moved from Zwickau, Germany to Chattanooga, Tennessee starting late 2022 / MY2023, making the ID.4 one of the few EVs eligible for the full $7,500 federal tax credit. For 2025 the lineup was Pro / Pro S / Pro S Plus with optional AWD (the cheaper 62 kWh Standard / S trims with the smaller battery were discontinued for the US after MY2024). For 2026 the lineup is Pro, Pro S, Pro S Plus with the larger 82 kWh battery standard, a NACS-to-CCS1 adapter included, slightly raised pricing, and updated standard equipment. Sources: https://www.vw.com/en/models/id-4.html ; https://cars.usnews.com/cars-trucks/volkswagen/id-4 ; https://www.edmunds.com/volkswagen/id4/",
  powertrainOptions: ["BEV"],
  segment: "compact",
  shortList: false,
  sources:
    "- https://www.vw.com/en/models/id-4.html\n- https://www.edmunds.com/volkswagen/id4/\n- https://cars.usnews.com/cars-trucks/volkswagen/id-4\n- https://www.kbb.com/volkswagen/id4/\n- https://www.cars.com/articles/how-much-is-the-2026-volkswagen-id-4-519597/",
  exclusionReason: "All years excluded",
  carMakeSlug: "volkswagen",
} as const satisfies CarModel
