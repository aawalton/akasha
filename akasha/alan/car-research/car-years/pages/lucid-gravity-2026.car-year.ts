import type { CarYear } from "../car-year.page-type.ts"

export const lucidGravity2026 = {
  id: "019e4aeb-3f6a-762d-a6e4-400aa0423b50",
  pageTypeSlug: "car-year",
  slug: "lucid-gravity-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "First full model year for Gravity. Major addition: the Touring trim launched November 2025 at $79,900, opening a sub-$80k entry point versus the $94,900-$98,900 Grand Touring. Touring uses a less-powerful dual-motor setup (560 hp, 811 lb-ft, 4.0 s 0-60, 337 mi EPA range, 300 kW peak DC) versus Grand Touring (828 hp, 909 lb-ft, 3.4 s 0-60, 450 mi range, 400 kW peak DC). Both share the 1000V-capable charging architecture, the 34-inch Clearview Cockpit, 120 cu ft max cargo, 8.1 cu ft frunk, and native NACS port.\n\nSources:\n- https://electrek.co/2025/11/20/lucid-motors-launches-gravity-touring-suv-starting-below-80000-video/\n- https://cars.usnews.com/cars-trucks/lucid/gravity\n- https://theweeklydriver.com/2026/04/lucid-gravity-touring-2026-preview/",
  shortList: false,
  sources:
    "- https://lucidmotors.com/gravity\n- https://cars.usnews.com/cars-trucks/lucid/gravity\n- https://www.kbb.com/lucid/gravity/2026/specs/\n- https://electrek.co/2025/11/20/lucid-motors-launches-gravity-touring-suv-starting-below-80000-video/",
  exclusionReason: "All trims excluded",
  carModelSlug: "lucid-gravity",
} as const satisfies CarYear
