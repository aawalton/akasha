import type { CarModel } from "../car-model.page-type.ts"

export const bmw7Series = {
  id: "019e4ad7-b132-7645-91eb-251721eb13a9",
  pageTypeSlug: "car-model",
  slug: "bmw-7-series",
  title: "7 Series",
  bodyStyle: "sedan",
  generation: "7th gen (G70, 2023-)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The BMW 7 Series is BMW's flagship full-size luxury sedan, in its seventh generation (G70) since MY2023. The lineup mirrors the i7 with an ICE/MHEV 760i xDrive (V8 mild hybrid) and the 750e xDrive PHEV. The 750e xDrive combines a 3.0L turbo inline-six with an electric motor for a combined 483 hp and an EPA-estimated 33-34 miles of electric range. Like the i7 it features the Theater Screen and BMW iDrive 8.5.\n\nSources:\n- https://www.bmwusa.com/vehicles/7-series/sedan/plug-in-hybrid.html\n- https://www.cars.com/research/bmw-750e-2025/",
  powertrainOptions: ["PHEV", "ICE", "MHEV"],
  segment: "luxury-full-size",
  shortList: false,
  sources:
    "- BMW USA 7 Series PHEV — https://www.bmwusa.com/vehicles/7-series/sedan/plug-in-hybrid.html\n- Cars.com 2025 750e — https://www.cars.com/research/bmw-750e-2025/\n- Edmunds 2025 7 Series PHEV — https://www.edmunds.com/bmw/7-series/2025/plug-in-hybrid/",
  exclusionReason: "All years excluded",
  carMakeSlug: "bmw",
} as const satisfies CarModel
