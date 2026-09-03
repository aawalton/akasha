import type { CarYear } from "../car-year.page-type.ts"

export const lincolnNautilusHybrid2026 = {
  id: "019e4aeb-7a22-73b2-a423-8cd2c3734010",
  pageTypeSlug: "car-year",
  slug: "lincoln-nautilus-hybrid-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Largely carryover from 2025. Hybrid (2.0L turbo + 100-kW motor, 310 hp combined, 30 mpg combined) remains optional across Premiere, Reserve, Black Label — premium of ~$3,000 over equivalent 2.0T non-hybrid. AWD standard. Prices nudged up slightly: Premiere Hybrid ~$56,995, Reserve Hybrid ~$66,595, Black Label Hybrid ~$80,130. BlueCruise 1.3 standard. EPA city/highway revised to 29/31 vs. 30/31 in 2025. Sources: https://www.dorallincoln.com/2026-lincoln-nautilus-hybrid-specs-features-model-review-doral-fl.html , https://shop.lincoln.com/build/nautilus/chooseyourpath/ , https://www.jclewislincoln.com/2026-lincoln-nautilus-trim-levels",
  shortList: false,
  sources:
    "- Lincoln 2026 builder: https://shop.lincoln.com/build/nautilus/chooseyourpath/\n- Doral Lincoln 2026 specs: https://www.dorallincoln.com/2026-lincoln-nautilus-hybrid-specs-features-model-review-doral-fl.html\n- US News 2026 configs: https://cars.usnews.com/cars-trucks/lincoln/nautilus-hybrid/specs\n- JC Lewis 2026 trims: https://www.jclewislincoln.com/2026-lincoln-nautilus-trim-levels",
  exclusionReason: "All trims excluded",
  carModelSlug: "lincoln-nautilus-hybrid",
} as const satisfies CarYear
