import type { CarModel } from "../car-model.page-type.ts"

export const bmwI7 = {
  id: "019e4ad6-fb84-78fa-a44c-02e511a9cde9",
  pageTypeSlug: "car-model",
  slug: "bmw-i7",
  title: "i7",
  bodyStyle: "sedan",
  generation: "7th gen 7 Series (G70, 2023-)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The BMW i7 is the all-electric variant of the seventh-generation 7 Series, the flagship BMW luxury sedan, launched for MY2023 on the modified CLAR platform shared with the i4 and i5. It competes with the Mercedes-Maybach EQS, Lucid Air, and Rolls-Royce Spectre in the luxury-full-size electric sedan segment. For MY2025 / MY2026 the i7 is sold in three trims: eDrive50 (RWD), xDrive60 (AWD), and M70 xDrive (top-performance AWD). Notable features include rear executive lounge seating, 31-inch Theater Screen, and BMW iDrive 8.5.\n\nSources:\n- https://www.bmwusa.com/vehicles/bmw-i-series/i7/bmw-i7.html\n- https://cars.usnews.com/cars-trucks/bmw/i7/2026",
  powertrainOptions: ["BEV"],
  segment: "luxury-full-size",
  shortList: false,
  sources:
    "- BMW USA — https://www.bmwusa.com/vehicles/bmw-i-series/i7/bmw-i7.html\n- Edmunds — https://www.edmunds.com/bmw/i7/\n- US News — https://cars.usnews.com/cars-trucks/bmw/i7/2026\n- Autoblog — https://www.autoblog.com/cars/bmw/i7/2026",
  exclusionReason: "All years excluded",
  carMakeSlug: "bmw",
} as const satisfies CarModel
