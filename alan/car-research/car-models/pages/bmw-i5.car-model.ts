import type { CarModel } from "../car-model.page-type.ts"

export const bmwI5 = {
  id: "019e4ad6-d3bd-79d7-b4f4-e9dac596077a",
  pageTypeSlug: "car-model",
  slug: "bmw-i5",
  title: "i5",
  bodyStyle: "sedan",
  generation: "8th gen 5 Series (G60, 2024-)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The BMW i5 is the all-electric variant of the eighth-generation 5 Series sedan, launched for MY2024 alongside the gas 530i / 540i. Built on the modified CLAR platform shared with the i4 and i7, the i5 directly targets the Mercedes EQE and Audi e-tron GT in the luxury-midsize EV sedan segment. For MY2025 / MY2026 it remains available in three trims: eDrive40 (RWD), xDrive40 (AWD), and M60 xDrive (performance AWD). An i5 Touring (wagon) is sold in Europe but not the US. iDrive 8.5 with curved display is standard.\n\nSources:\n- https://www.bmwusa.com/vehicles/bmw-i-series/i5/bmw-i5-overview.html\n- https://www.edmunds.com/bmw/i5/",
  powertrainOptions: ["BEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- BMW USA — https://www.bmwusa.com/vehicles/bmw-i-series/i5/bmw-i5-overview.html\n- Edmunds 2026 i5 — https://www.edmunds.com/bmw/i5/\n- US News 2026 i5 — https://cars.usnews.com/cars-trucks/bmw/i5\n- TrueCar — https://www.truecar.com/overview/bmw/i5/",
  exclusionReason: "All years excluded",
  carMakeSlug: "bmw",
} as const satisfies CarModel
